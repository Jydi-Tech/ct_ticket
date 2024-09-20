import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';
import * as Labels from './users.label';
import { UsersCreateComponent } from '../users-create/users-create.component';


@Component({
  selector: 'app-users',
  standalone: true,
  providers: [DataService],
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public dynamicComponent: any;
  public buttonLabels: string[] = Labels.USER_BUTTON_LABELS;
  private Table = Labels.USER_TABLE;
  public Label = Labels.USER_LABELS;

  public userFields: string[] = [
    this.Table.FirstName,
    this.Table.LastName,
    this.Table.Role,
    this.Table.Address,
    this.Table.Address2,
    this.Table.City,
    this.Table.State,
    this.Table.ZipCode,
    this.Table.PhoneNumber,
    this.Table.Email,
    this.Table.Password
  ];

  public userHeaders: string[] = [
    this.Table.UserID,
    this.Table.FirstName,
    this.Table.LastName,
    this.Table.Role,
    this.Table.Address,
    this.Table.Address2,
    this.Table.City,
    this.Table.State,
    this.Table.ZipCode,
    this.Table.PhoneNumber,
    this.Table.Email,
    this.Table.Password
  ];
  users: any[] = [];
  filteredUsers: any[] = [];
  editingUserId: number | null = null;
  currentSortColumn: string = '';
  currentSortDirection: string = '';
  searchTerms: { [key: string]: string } = {};
  editForm: FormGroup;
  editImage: string = environment.imageUrl + "/edit.png";
  trashImage: string = environment.imageUrl + "/trash.png";

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      UserID: [''],
      FirstName: [''],
      LastName: [''],
      Role: [''],
      Address: [''],
      Address2: [''],
      City: [''],
      State: [''],
      ZipCode: [''],
      PhoneNumber: [''],
      Email: [''],
      Password: ['']
    })
  }
  ngOnInit(): void {
    this.fetchUsers();
  }
  onButtonClick(buttonLabel: string) {
    switch (buttonLabel) {
      case '+ New User':
        this.dynamicComponent = this.dynamicComponent == null ? UsersCreateComponent : null;
        console.log('UserCreate button clicked');
        break;
      case 'Clear Search Data':
        this.searchTerms = {};
        this.filteredUsers = [...this.users];
        this.fetchUsers();
        break;
      default:
        console.log('No function for: ' + buttonLabel);
        break;
    }
  }

  fetchUsers() {
    this.dataService.getItem("users").subscribe({
      next: response => {
        this.users = response;
        this.filteredUsers = response;
        this.sortTable(this.currentSortColumn);  //apply current sort
        console.log('Users retrieved!', this.users);
      },
      error: error => console.error('Error retrieving Users', error),
      complete: () => console.log('Request complete') // Optional if you need to handle completion
    })
  }

  deleteUser(userID: number) {
    if (confirm('Are you sure you want to delete this item?: ' + userID)) {
      this.dataService.deleteItem("users", userID).subscribe({
        next: response => {
          console.log('User deleted!', response);
          this.fetchUsers(); // Refresh the list after deletion
        },
        error: error => {
          
          console.error('Error deleting user', error)},
        complete: () => console.log('Request complete')
      });
    } else {
      console.log('not deleted due to selection.');
    }
  }
  
  editUser(userID: number) {
    this.editingUserId = userID;
    const user = this.users.find(c => c.UserID === userID);
    if (user) {
      this.editForm.patchValue(user);
    }
  }

  applyUser() {
    const updatedUser = this.editForm.value;
    this.dataService.updateItem("users", updatedUser.UserID, updatedUser).subscribe({
      next: response => {
        this.editingUserId = null; // Exit edit mode
        this.fetchUsers(); // Refresh the list after update
      },
      error: error => console.error('Error updating user', error),
      complete: () => console.log('Request complete')
    });
  }

  cancelUser() {
    this.editingUserId = null;
  }

  sortTable(column: string) {
    if (this.currentSortColumn === column) {
      this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortColumn = column;
      this.currentSortDirection = 'asc';
    }

    this.filteredUsers.sort((a, b) => {
      if (a[column] < b[column]) {
        return this.currentSortDirection === 'asc' ? -1 : 1;
      } else if (a[column] > b[column]) {
        return this.currentSortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  getSortIcon(column: string): string {
    if (this.currentSortColumn !== column) {
      return '';
    }
    return this.currentSortDirection === 'asc' ? 'sort-asc' : 'sort-desc';
  }

  searchTable(event: any, column: string) {
    this.searchTerms[column] = event.target.value.toLowerCase();
    this.filteredUsers = [];
    for (let user in this.users) {
      let match = true;
      for (const key in this.searchTerms) {
        const searchTerm = this.searchTerms[key];
        const keyValue = this.users[user][key];
        if (!String(keyValue).toLowerCase().includes(searchTerm) || (searchTerm !== '' && key === 'UserID' && keyValue !== +searchTerm)) {
          match = false;
          break;
        }
      }
      if (match) {
        this.filteredUsers.push(this.users[user]);
      }
    }
  }
  
  addUser(username: string, password: string, email: string) {
    const newUser = {
      username: username.trim(),
      password: password.trim(), // In a real app, you'd hash this before sending
      email: email.trim(),
      role: 'admin'
    };

    this.dataService.createItem("users", newUser).subscribe({
      next: response => console.log('Admin user added!', response),
      error: error => console.error('Error adding user', error),
      complete: () => console.log('Request complete') // Optional if you need to handle completion
    });
  }
}
