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


  addCustomer(firstName: string, lastName: string, email: string, phoneNumber: string, address: string, city: string, state: string, zipCode: string, referralSource: string) {    const newCustomer = {
      FirstName: firstName.trim(),
      LastName: lastName.trim(),
      Email: email.trim(),
      PhoneNumber: phoneNumber.trim(),
      Address: address.trim(),
      City: city.trim(),
      State: state.trim(),
      ZipCode: zipCode.trim(),
      ReferralSource: referralSource.trim()
    };
    this.dataService.createItem("customers", newCustomer).subscribe({
      next: response => console.log('customer user added!', response),
      error: error => console.error('Error adding user', error),
      complete: () => console.log('Request complete') 
    });
  }
  
}
