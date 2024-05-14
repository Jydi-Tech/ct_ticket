import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomersReadComponent } from '../customers-read/customers-read.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customers-create',
  standalone: true,
  providers: [DataService],
  imports: [RouterModule, CommonModule, HttpClientModule, CustomersReadComponent, CustomersCreateComponent],  
  templateUrl: './customers-create.component.html',
  styleUrl: './customers-create.component.css'
})
export class CustomersCreateComponent {
  constructor(private dataService: DataService) { }


  addCustomer(firstName: string, lastName: string, email: string, phone: string, address: string, city: string, state: string, zip: string, refferalsource: string) {
    const newCustomer = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      zip: zip.trim(),
      refferalsource: refferalsource.trim()
    };
    this.dataService.createItem("customers", newCustomer).subscribe({
      next: response => console.log('customer user added!', response),
      error: error => console.error('Error adding user', error),
      complete: () => console.log('Request complete') 
    });
  }
  
}
