import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customers-create',
  standalone: true,
  providers: [DataService],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './customers-create.component.html',
  styleUrls: ['./customers-create.component.css'],

})
export class CustomersCreateComponent {
  @Output() formSubmitSuccess = new EventEmitter<void>(); // Event emitter to notify parent

  createForm: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Address: ['', Validators.required],
      Address2: [''],
      City: ['', Validators.required],
      State: ['', Validators.required],
      ZipCode: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      ReferralSource: ['', Validators.required]
    });
  }

  addCustomer() {
    if (this.createForm.valid) {
      const newCustomer = this.createForm.value;
      console.log('Add Customer called');
      console.log('New Customer:', newCustomer);
      this.dataService.createItem("customers", newCustomer).subscribe({
        next: response =>{
          this.createForm.reset();
          this.formSubmitSuccess.emit();
           console.log('****customer added!', response);           
          },
        error: error => console.error('Error adding customer****', error),
        complete: () => console.log('Request complete')
      });
    } else {
      console.error('Form is not valid');
    }
  }
}
