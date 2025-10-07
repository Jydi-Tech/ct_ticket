import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TicketsComponent } from './tickets/tickets.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { CustomersComponent } from './customers/customers.component';
import { UsersComponent } from './users/users.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { CustomersCreateComponent } from './customers-create/customers-create.component';
import { TicketsCreateComponent } from './tickets-create/tickets-create.component';


export const routes: Routes = [

    
    { path: '', component: MainComponent},
    { path: 'Main', component: MainComponent},
    { path: 'Tickets', component: TicketsComponent},
    { path: 'Tickets/Create', component: TicketsCreateComponent},
    { path: 'Invoices', component: InvoicesComponent},
    { path: 'Customers', component: CustomersComponent},
    { path: 'Customers/Create', component: CustomersCreateComponent},
    { path: 'Users', component: UsersComponent},
    { path: 'Users/Create', component: UsersCreateComponent},
    { path: 'Reports', component: MainComponent},
 { path: '**', redirectTo: ''},
    
];

export class AppModule{
    
}
