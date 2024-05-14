import { CommonModule } from '@angular/common';
import { Component, Injector} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOMER_BUTTON_LABELS } from '../../environments/buttonLabels';
import { CustomersReadComponent } from "../customers-read/customers-read.component";
import { CustomersCreateComponent } from '../customers-create/customers-create.component';
import { CustomersUpdateComponent } from '../customers-update/customers-update.component';


@Component({
    selector: 'app-customers',
    standalone: true,
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css'],
    imports: [RouterModule, CommonModule, HttpClientModule, CustomersReadComponent]
})
export class CustomersComponent {
  public dynamicComponent: any = CustomersReadComponent;
  public buttonLabels : string[] = CUSTOMER_BUTTON_LABELS;
  //public componentInputs: Record<string, unknown> = {};
  constructor(/*protected injector: Injector*/) {  }

  onButtonClick(buttonLabel: string){

    switch(buttonLabel){
      case 'Search Customers':
        this.dynamicComponent = CustomersReadComponent;
        console.log('CustomerRead button clicked');
        break;
      case 'Add Customer':
        this.dynamicComponent = CustomersCreateComponent;
        console.log('CustomerCreate button clicked');
        break;
      case 'Edit Customer':
        this.dynamicComponent = CustomersUpdateComponent;
        break;
      case 'Delete Selected':
        console.log('Delete Selected button clicked');
        break;
      default:
        console.log('No component found for button label: ' + buttonLabel);
        break;
    }
  }  
}
