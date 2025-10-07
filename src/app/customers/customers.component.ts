import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { CustomersCreateComponent } from '../customers-create/customers-create.component';
import { environment } from '../../environments/environment';
import * as Labels from './customers.labels';


@Component({
  selector: 'app-customers',
  standalone: true,
  providers: [DataService],
  imports: [CommonModule, ReactiveFormsModule, CustomersCreateComponent],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {

  public dynamicComponent: any;
  public buttonLabels: string[] = Labels.CUSTOMER_BUTTON_LABELS;
  private Table = Labels.CUSTOMER_TABLE;
  public Label = Labels.CUSTOMER_LABELS;

  public customerFields: string[] = [
    this.Table.FirstName,
    this.Table.LastName,
    this.Table.Address,
    this.Table.Address2,
    this.Table.City,
    this.Table.State,
    this.Table.ZipCode,
    this.Table.PhoneNumber,
    this.Table.Email,
    this.Table.ReferralSource
  ];
  public customerHeaders: string[] = [
    this.Table.CustomerID,
    this.Table.FirstName,
    this.Table.LastName,
    this.Table.Address,
    this.Table.Address2,
    this.Table.City,
    this.Table.State,
    this.Table.ZipCode,
    this.Table.PhoneNumber,
    this.Table.Email,
    this.Table.ReferralSource
  ];
  customers: any[] = [];
  filteredCustomers: any[] = [];
  editingCustomerId: number | null = null;
  currentSortColumn: string = '';
  currentSortDirection: string = '';
  searchTerms: { [key: string]: string } = {};
  editForm: FormGroup;
  editImage: string = environment.imageUrl + "/edit.png";
  trashImage: string = environment.imageUrl + "/trash.png";
  errorMessage: string | null = null;
  errorDetails: any;

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      CustomerID: [''],
      FirstName: [''],
      LastName: [''],
      Address: [''],
      Address2: [''],
      City: [''],
      State: [''],
      ZipCode: [''],
      PhoneNumber: [''],
      Email: [''],
      ReferralSource: ['']
    });
  }
  ngOnInit(): void {
    this.fetchCustomers();
  }

  onButtonClick(buttonLabel: string) {
    switch (buttonLabel) {
      case '+ New Customer':
        this.dynamicComponent = this.dynamicComponent == null ? CustomersCreateComponent : null;
        console.log('CustomerCreate button clicked');
        break;
      case 'Clear Search Data':
        this.searchTerms = {};
        this.filteredCustomers = [...this.customers];
        this.fetchCustomers();
        break;
      default:
        console.log('No function for: ' + buttonLabel);
        break;
    }
  }

  handleFormSubmit() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.dataService.getItem("customers").subscribe({
      next: response => {
        this.customers = response;
        this.filteredCustomers = response;
        this.sortTable(this.currentSortColumn); // Apply current sort
        //console.log('Customers retrieved!', this.customers);
      },
      error: error => console.error('Error retrieving customers', error),
      complete: () => console.log('Request complete') // Optional if you need to handle completion
    });
  }

  deleteCustomer(customerID: number) {
    if (confirm('Are you sure you want to delete this item?: ' + customerID)) {
      this.dataService.deleteItem("customers", customerID).subscribe({
        next: response => {
          console.log('Customer deleted!', response);
          this.fetchCustomers(); // Refresh the list after deletion
        },
        error: error => {
          console.error('Error deleting customer', error);
          this.errorMessage = error.error.message;
          this.errorDetails = error.error.usageDetails;
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

  editCustomer(customerID: number) {
    this.editingCustomerId = customerID;
    const customer = this.customers.find(c => c.CustomerID === customerID);
    if (customer) {
      this.editForm.patchValue(customer);
    }
  }

  applyCustomer() {
    const updatedCustomer = this.editForm.value;
    this.dataService.updateItem("customers", updatedCustomer.CustomerID, updatedCustomer).subscribe({
      next: response => {
        this.editingCustomerId = null; // Exit edit mode
        this.fetchCustomers(); // Refresh the list after update
      },
      error: error => console.error('Error updating customer', error),
      complete: () => console.log('Request complete')
    });
  }

  cancelCustomer() {
    this.editingCustomerId = null;
  }

  sortTable(column: string) {
    if (this.currentSortColumn === column) {
      this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortColumn = column;
      this.currentSortDirection = 'asc';
    }

    this.filteredCustomers.sort((a, b) => {
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
    this.filteredCustomers = [];
    for (let customer in this.customers) {
      let match = true;
      for (const key in this.searchTerms) {
        const searchTerm = this.searchTerms[key];
        const keyValue = this.customers[customer][key];
        if (!String(keyValue).toLowerCase().includes(searchTerm) || (searchTerm !== '' && key === 'CustomerID' && keyValue !== +searchTerm)) {
          match = false;
          break;
        }
      }
      if (match) {
        this.filteredCustomers.push(this.customers[customer]);
      }
    }
  }
  getLabel(header : string) : string{
    return this.Label[header as keyof typeof this.Label] || header;
 
  }

}
