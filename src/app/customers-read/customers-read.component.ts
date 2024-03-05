import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomersCreateComponent } from '../customers-create/customers-create.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customers-read',
  standalone: true,
  providers: [DataService],
  imports: [RouterModule, CommonModule, HttpClientModule, CustomersReadComponent, CustomersCreateComponent],
  templateUrl: './customers-read.component.html',
  styleUrl: './customers-read.component.css'
})
export class CustomersReadComponent {
  constructor(private dataService: DataService) { }
  searchCustomers(arg0: string) {
    throw new Error('Method not implemented.');
  }



  ngOnInit() {
  }
}
