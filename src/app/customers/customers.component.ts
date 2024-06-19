import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CustomersUpdateComponent } from '../customers-update/customers-update.component';
import { DataService } from '../data.service';
import { CustomersCreateComponent } from '../customers-create/customers-create.component';
import { CUSTOMER_BUTTON_LABELS } from './customers.ButtonLabels';


@Component({
    selector: 'app-customers',
    standalone: true,
    providers: [DataService],
    imports: [RouterModule, CommonModule, HttpClientModule],
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit{
  public dynamicComponent: any;
  public buttonLabels : string[] = CUSTOMER_BUTTON_LABELS;
  customers: any[] = [];
  filteredCustomers: any[] = [];
  currentSortColumn: string = '';
  currentSortDirection: string = '';
  searchTerms: { [key: string]: string } = {};

  constructor(private dataService: DataService) {  }

  ngOnInit(): void {
    this.fetchCustomers();
  }

  onButtonClick(buttonLabel: string){

    switch(buttonLabel){
      case '+ New Customer':
        if (this.dynamicComponent == null){
          this.dynamicComponent = CustomersCreateComponent;
        } else {
          this.dynamicComponent = null;
        }
        console.log('CustomerCreate button clicked');
        break;
      case 'Clear Search Data':
        
        break;
      case 'Delete Selected':
        console.log('Delete Selected button clicked');
        break;
      default:
        console.log('No component found for button label: ' + buttonLabel);
        break;
    }
  }  

  fetchCustomers() {
    console.log('fetch customers accessed');
    this.dataService.getItem("customers").subscribe({
      next: response => {
        this.customers = response;
        this.filteredCustomers = response;
        this.sortTable(this.currentSortColumn); // Apply current sort
        console.log('Customers retrieved!', this.customers);
      },
      error: error => console.error('Error retrieving customers', error),
      complete: () => console.log('Request complete') // Optional if you need to handle completion
    });
  }

  deleteCustomer(arg0: any) {
    let customerID : any = arg0;
    console.log('delete customer button clicked');
    this.dataService.deleteItem("customers", customerID).subscribe({
      next: response => {
        console.log('Customer deleted!', response);
        this.fetchCustomers(); // Refresh the list after deletion
      },
      error: error => console.error('Error deleting customer', error),
      complete: () => console.log('Request complete') // Optional if you need to handle completion
    });
  }

  editCustomer(arg0: any) {
    let customerID : any = arg0;
    
  }

  sortTable(column: string) {
    if (this.currentSortColumn === column) {
      // Toggle sort direction
      this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set new sort column and default to ascending order
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
    this.filteredCustomers = this.customers.filter(customer => {
      return Object.keys(this.searchTerms).every(key => {
        return String(customer[key]).toLowerCase().includes(this.searchTerms[key]);
      });
    });
  }
}
