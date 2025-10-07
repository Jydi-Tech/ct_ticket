import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';
import * as Labels from './tickets.label';
import { TicketsCreateComponent } from '../tickets-create/tickets-create.component';


@Component({
  selector: 'app-tickets',
  standalone: true,
  providers: [DataService],
  imports: [CommonModule, ReactiveFormsModule, TicketsCreateComponent],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  public dynamicComponent: any;
  public buttonLabels: string[] = Labels.TICKET_BUTTON_LABELS;
  private Table = Labels.TICKET_TABLE;
  public Label = Labels.TICKET_LABELS;

  public ticketFields: string[] = [
    this.Table.Title,
    this.Table.Description,
    this.Table.Status,
    this.Table.Priority,
    this.Table.DevicePassword,
    this.Table.CustomerID,
    this.Table.AssignedTo,
    this.Table.CreatedAt,
    this.Table.UpdatedAt
  ];

  public ticketHeaders: string[] = [
    this.Table.TicketID,
    this.Table.Title,
    this.Table.Description,
    this.Table.Status,
    this.Table.Priority,
    this.Table.DevicePassword,
    this.Table.CustomerID,
    this.Table.AssignedTo,
    this.Table.CreatedAt,
    this.Table.UpdatedAt
  ];
  tickets: any[] = [];
  filteredTickets: any[] = [];
  editingTicketId: number | null = null;
  currentSortColumn: string = '';
  currentSortDirection: string = '';
  searchTerms: { [key: string]: string } = {};
  editForm: FormGroup;
  editImage: string = environment.imageUrl + "/edit.png";
  trashImage: string = environment.imageUrl + "/trash.png";
  errorMessage: string | null = null;
  errorDetails: any;
  users: any;
  customers: any;



  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      TicketID: [''],
      Title: [''],
      Description: [''],
      Status: [''],
      Priority: [''],
      DevicePassword: [''],
      CustomerID: [''],
      AssignedTo: [''],
      CreatedAt: [''],
      UpdatedAt: ['']
    })
  }
  ngOnInit(): void {
    this.fetchtickets();
  }
  
  onButtonClick(buttonLabel: string) {
    switch (buttonLabel) {
      case '+ New Ticket':
        this.dynamicComponent = this.dynamicComponent == null ? TicketsCreateComponent : null;
        console.log('Ticketcreate button clicked');
        break;
      case 'Clear Search Data':
        this.searchTerms = {};
        this.filteredTickets = [...this.tickets];
        this.fetchtickets();
        break;
      default:
        console.log('No function for: ' + buttonLabel);
        break;
    }
  }

  handleFormSubmit() {
    this.fetchtickets(); // Call fetchtickets when the child emits the submit event
  }

  fetchtickets() {
    this.dataService.getItem("tickets").subscribe({
      next: response => {
        this.tickets = response;
        this.filteredTickets = response;
        this.sortTable(this.currentSortColumn);  //apply current sort
        //console.log('tickets retrieved!', this.tickets);
      },
      error: error => console.error('Error retrieving tickets', error),
      complete: () => console.log('Request complete') // Optional if you need to handle completion
    })
  }

  deleteTicket(ticketID: number) {
    if (confirm('Are you sure you want to delete this item?: ' + ticketID)) {
      this.dataService.deleteItem("tickets", ticketID).subscribe({
        next: response => {
          console.log('ticket deleted!', response);
          this.fetchtickets(); // Refresh the list after deletion
        },
        error: error => {          
          console.error('Error deleting ticket', error);
          this.errorMessage = error.error.message;
          this.users = error.error.users;
          this.customers = error.error.customers;
        },
        complete: () => console.log('Request complete')
      });
    } else {
      console.log('not deleted due to selection.');
    }
  }

  clearErrorMessage() {
    this.errorMessage = null;
    this.errorDetails = null;
  }
  
  editTicket(ticketID: number) {
    this.editingTicketId = ticketID;
    const ticket = this.tickets.find(c => c.TicketID === ticketID);
    if (ticket) {
      this.editForm.patchValue(ticket);
    }
  }

  applyTicket() {
    const updatedTicket = this.editForm.value;
    this.dataService.updateItem("tickets", updatedTicket.TicketID, updatedTicket).subscribe({
      next: response => {
        this.editingTicketId = null; // Exit edit mode
        this.fetchtickets(); // Refresh the list after update
      },
      error: error => console.error('Error updating ticket', error),
      complete: () => console.log('Request complete')
    });
  }

  cancelTicket() {
    this.editingTicketId = null;
  }

  resetPassword(ticketID: string) {
    console.log('TODO: Make a reset password pop up window with some kind of verification or admin requirements');

  }

  sortTable(column: string) {
    if (this.currentSortColumn === column) {
      this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortColumn = column;
      this.currentSortDirection = 'asc';
    }

    this.filteredTickets.sort((a, b) => {
      if (a[column] < b[column]) {
        return this.currentSortDirection === 'asc' ? -1 : 1;
      } else if (a[column] > b[column]) {
        return this.currentSortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  getSortIcon(column: string): string {
    if (this.currentSortColumn !== column) {
      return '';
    }
    return this.currentSortDirection === 'asc' ? 'sort-asc' : 'sort-desc';
  }

  searchTable(event: any, column: string) {
    this.searchTerms[column] = event.target.value.toLowerCase();
    this.filteredTickets = [];
    for (let ticket in this.tickets) {
      let match = true;
      for (const key in this.searchTerms) {
        const searchTerm = this.searchTerms[key];
        const keyValue = this.tickets[ticket][key];
        if (!String(keyValue).toLowerCase().includes(searchTerm) || (searchTerm !== '' && key === 'TicketID' && keyValue !== +searchTerm)) {
          match = false;
          break;
        }
      }
      if (match) {
        this.filteredTickets.push(this.tickets[ticket]);
      }
    }
  }
  
  addTicket(ticketname: string, password: string, email: string) {
    const newTicket = {
      ticketname: ticketname.trim(),
      password: password.trim(), // In a real app, you'd hash this before sending
      email: email.trim(),
      role: 'admin'
    };

    this.dataService.createItem("tickets", newTicket).subscribe({
      next: response => console.log('Admin ticket added!', response),
      error: error => console.error('Error adding ticket', error),
      complete: () => console.log('Request complete') // Optional if you need to handle completion
    });
  }

  // Map header (field name) to ticket-friendly label
  getLabel(header: string): string {
    return this.Label[header as keyof typeof this.Label] || header;
  }
}
