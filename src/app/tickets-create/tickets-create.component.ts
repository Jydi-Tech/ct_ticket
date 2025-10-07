import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, EmailValidator, Form } from '@angular/forms';
import { DataService } from '../data.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-tickets-create',
  standalone: true,
  providers: [DataService],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './tickets-create.component.html',
  styleUrls: ['./tickets-create.component.css'],
})
export class TicketsCreateComponent {
  @Output() formSubmitSuccess = new EventEmitter<void>(); // Event emitter to notify parent

  createForm: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder){
    this.createForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Status: ['', Validators.required],
      Priority: ['', Validators.required],
      DevicePassword: ['', Validators.required],
      CustomerID: ['', Validators.required],
      AssignedTo: ['', Validators.required],
    });
  }

  addTicket(){
    if(this.createForm.valid){
      const newTicket = this.createForm.value;
      console.log("newticket: ", newTicket);
      this.dataService.createItem("tickets", newTicket).subscribe({
        next: response => {
          this.createForm.reset();
          this.formSubmitSuccess.emit();
          
        },
        error: error => console.error('Error adding a Ticket******', error),
        complete: () => console.log('completed addTicket')
      });
    } else {
      console.error('form is not valid')
    }
  }
}
