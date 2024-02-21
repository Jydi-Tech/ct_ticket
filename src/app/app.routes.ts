import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TicketsComponent } from './tickets/tickets.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { CustomersComponent } from './customers/customers.component';
import { EmployeesComponent } from './employees/employees.component';


export const routes: Routes = [
    { path: '', component: MainComponent},
    { path: 'Main', component: MainComponent},
    { path: 'Tickets', component: TicketsComponent},
    { path: 'Invoices', component: InvoicesComponent},
    { path: 'Customers', component: CustomersComponent},
    { path: 'Employees', component: EmployeesComponent}
    
];

export class AppModule{
    
}
