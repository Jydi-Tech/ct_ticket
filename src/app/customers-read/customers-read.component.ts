import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customers-read',
  standalone: true,
  providers: [DataService],
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './customers-read.component.html',
  styleUrls: ['./customers-read.component.css']
})
export class CustomersReadComponent implements OnInit{

  customers: any[] = [];
  filteredCustomers: any[] = [];
  currentSortColumn: string = '';
  currentSortDirection: string = '';
  searchTerms: { [key: string]: string } = {};

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.fetchCustomers();
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
    console.log('did we get in?');
    console.log('arg0 is :', arg0);
    console.log('delete customer button ');
    this.dataService.deleteItem("customers", arg0).subscribe({
      next: response => {
        console.log('Customer deleted!', response);
        this.fetchCustomers(); // Refresh the list after deletion
      },
      error: error => console.error('Error deleting customer', error),
      complete: () => console.log('Request complete') // Optional if you need to handle completion
    });
  }

  editCustomer(arg0: any) {
    console.log('edit customer button clicked');
  }

  searchCustomers(arg0: string) {
    this.fetchCustomers();
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
