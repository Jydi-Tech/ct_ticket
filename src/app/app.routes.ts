import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TicketsComponent } from './tickets/tickets.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { CustomersComponent } from './customers/customers.component';
import { EmployeesComponent } from './employees/employees.component';
import { CustomersCreateComponent } from './customers-create/customers-create.component';
import { CustomersDeleteComponent } from './customers-delete/customers-delete.component';
import { CustomersUpdateComponent } from './customers-update/customers-update.component';
import { CustomersReadComponent } from './customers-read/customers-read.component';
import { ReportsComponent } from './reports/reports.component';
//import { EmployeesCreateComponent } from './employees-create/employees-create.component';
//import { EmployeesDeleteComponent } from './employees-delete/employees-delete.component';
//import { EmployeesUpdateComponent } from './employees-update/employees-update.component';
//import { EmployeesReadComponent } from './employees-read/employees-read.component';
//import { InvoicesCreateComponent } from './invoices-create/invoices-create.component';
//import { InvoicesDeleteComponent } from './invoices-delete/invoices-delete.component';
//import { InvoicesUpdateComponent } from './invoices-update/invoices-update.component';
//import { InvoicesReadComponent } from './invoices-read/invoices-read.component';
//import { PartsCreateComponent } from './parts-create/parts-create.component';
//import { PartsDeleteComponent } from './parts-delete/parts-delete.component';
//import { PartsUpdateComponent } from './parts-update/parts-update.component';
//import { PartsReadComponent } from './parts-read/parts-read.component';
//import { TicketsCreateComponent } from './tickets-create/tickets-create.component';
//import { TicketsDeleteComponent } from './tickets-delete/tickets-delete.component';
//import { TicketsUpdateComponent } from './tickets-update/tickets-update.component';
//import { TicketsReadComponent } from './tickets-read/tickets-read.component';
//import { ChargesCreateComponent } from './charges-create/charges-create.component';
//import { ChargesDeleteComponent } from './charges-delete/charges-delete.component';
//import { ChargesUpdateComponent } from './charges-update/charges-update.component';
//import { ChargesReadComponent } from './charges-read/charges-read.component';
//import { PaymentsCreateComponent } from './payments-create/payments-create.component';
//import { PaymentsDeleteComponent } from './payments-delete/payments-delete.component';
//import { PaymentsUpdateComponent } from './payments-update/payments-update.component';
//import { PaymentsReadComponent } from './payments-read/payments-read.component';

export const routes: Routes = [

    
    { path: '', component: MainComponent},
    { path: 'Main', component: MainComponent},
    { path: 'Tickets', component: TicketsComponent},
    { path: 'Invoices', component: InvoicesComponent},
    { path: 'Customers', component: CustomersComponent},
    { path: 'Employees', component: EmployeesComponent},
    { path: 'Customers/Create', component: CustomersCreateComponent},
    { path: 'Customers/Delete', component: CustomersDeleteComponent},
    { path: 'Customers/Update', component: CustomersUpdateComponent},
    { path: 'Customers/Read', component: CustomersReadComponent},
    { path: 'Reports', component: MainComponent},
 //   { path: 'Employees/Create', component: EmployeesCreateComponent},
 //   { path: 'Employees/Delete', component: EmployeesDeleteComponent},
 //   { path: 'Employees/Update', component: EmployeesUpdateComponent},
 //   { path: 'Employees/Read', component: EmployeesReadComponent},
 //   { path: 'Invoices/Create', component: InvoicesCreateComponent},
 //   { path: 'Invoices/Delete', component: InvoicesDeleteComponent},
 //   { path: 'Invoices/Update', component: InvoicesUpdateComponent},
 //   { path: 'Invoices/Read', component: InvoicesReadComponent},
 //   { path: 'Parts/Create', component: PartsCreateComponent},
 //   { path: 'Parts/Delete', component: PartsDeleteComponent},
 //   { path: 'Parts/Update', component: PartsUpdateComponent},
 //   { path: 'Parts/Read', component: PartsReadComponent},
 //   { path: 'Tickets/Create', component: TicketsCreateComponent},
 //   { path: 'Tickets/Delete', component: TicketsDeleteComponent},
 //   { path: 'Tickets/Update', component: TicketsUpdateComponent},
 //   { path: 'Tickets/Read', component: TicketsReadComponent},
 //   { path: 'Charges/Create', component: ChargesCreateComponent},
 //   { path: 'Charges/Delete', component: ChargesDeleteComponent},
 //   { path: 'Charges/Update', component: ChargesUpdateComponent},
 //   { path: 'Charges/Read', component: ChargesReadComponent},
 //   { path: 'Payments/Create', component: PaymentsCreateComponent},
 //   { path: 'Payments/Delete', component: PaymentsDeleteComponent},
 //   { path: 'Payments/Update', component: PaymentsUpdateComponent},
 //   { path: 'Payments/Read', component: PaymentsReadComponent},
 { path: '**', redirectTo: ''},
    
];

export class AppModule{
    
}
