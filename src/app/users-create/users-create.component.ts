import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { DataService } from '../data.service';
import { createInjectableType } from '@angular/compiler';

@Component({
  selector: 'app-users-create',
  standalone: true,
  providers: [DataService],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css'],

})
export class UsersCreateComponent {
  createForm: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Role: ['', Validators.required],
      Address: ['', Validators.required],
      Address2: [''],
      City: ['', Validators.required],
      State: ['', Validators.required],
      ZipCode: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  addUser() {
    if (this.createForm.valid) {
      const newUser = this.createForm.value;
      console.log('Add User called');
      console.log('new user:', newUser);
      this.dataService.createItem("users", newUser).subscribe({
        next: response => {
          console.log('****user added!', response);
          this.createForm.reset();
        }
        ,
        error: error => console.error('Error adding customer****', error),
        complete: () => {

          console.log('Request complete')
        }
      });
    } else {
      this.createForm.markAllAsTouched();
      console.error('Form is not valid');
    }
  }
}

