import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOMER_BUTTON_LABELS } from '../../environments/buttonLabels';
import { CustomersReadComponent } from "../customers-read/customers-read.component";


@Component({
  selector: 'app-customers',
  standalone: true,
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [CustomersReadComponent],
  imports: [RouterModule, CommonModule, HttpClientModule]
})
export class CustomersComponent {
  public buttonLabels : string[] = CUSTOMER_BUTTON_LABELS;
  constructor( private router: Router) {  }

  onButtonClick(buttonLabel: string){
    //this is needed to allow the button to work it passes the string
  }
  
  goToCreateCustomer() {
    this.router.navigate(['/Customers/Create']);
  }
}
