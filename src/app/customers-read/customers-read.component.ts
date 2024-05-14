import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomersCreateComponent } from '../customers-create/customers-create.component';
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

  customers: any;
  constructor(private dataService: DataService) { }
  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers() {
    console.log('fetch customers accessed');
    this.dataService.getItem("customers").subscribe({
      next: response => console.log('Customers retrieved!', response),
      error: error => console.error('Error retrieving customers', error),
      complete: () => console.log('Request complete') // Optional if you need to handle completion
    });
  }

  deleteCustomer(arg0: any) {
    console.log('delete customer button clicked');
    this.dataService.deleteItem("customers", arg0).subscribe({
      next: response => console.log('Customer deleted!', response),
      error: error => console.error('Error deleting customer', error),
      complete: () => console.log('Request complete') // Optional if you need to handle completion
    });
  }
  //needs to call the comustomers-update component
  editCustomer(arg0: any) {
    console.log('edit customer button clicked');
    
  }
  searchCustomers(arg0: string) {
    
  }




}
