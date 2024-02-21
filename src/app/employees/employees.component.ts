import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../data.service';
;import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  providers: [DataService],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  
  constructor(private dataService: DataService) {
    
    console.log('entered employee constructor component');
    
  }


  addAdminUser(username: string, password: string, email: string) {
    console.log('entered addAdminUser');
    const newUser = {
      username: username,
      password: password, // In a real app, you'd hash this before sending
      email: email,
      role: 'admin'
    };
    console.log('created new user '+ newUser);

    this.dataService
      .createItem("Ticket_DB.Users", newUser)
      .subscribe({
      next: response => console.log('Admin user added!', response),
      error: error => console.error('Error adding user', error),
      complete: () => console.log('Request complete') // Optional if you need to handle completion
    });
  }
}
