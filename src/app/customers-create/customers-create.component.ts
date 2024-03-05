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


  addCustomer(username: string, password: string, email: string) {
    const newUser = {
      username: username.trim(),
      password: password.trim(), // In a real app, you'd hash this before sending
      email: email.trim(),
      role: 'client',
    };

    this.dataService.createItem("users", newUser).subscribe({
      next: response => console.log('customer user added!', response),
      error: error => console.error('Error adding user', error),
      complete: () => console.log('Request complete') 
    });
  }
  
}
