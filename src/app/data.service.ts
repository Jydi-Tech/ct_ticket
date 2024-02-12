import { Injectable, importProvidersFrom } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //this might be wrong
  private apiRoot = 'http://ct_ticket.local/api/CRUD/TicketsDB';
  

  constructor(private http: HttpClient) { }
  ///  endpoint is a string that represents the specific table or endpoint (like 'users', 'tickets', etc.).
  ///  createItem, getItem, updateItem, and deleteItem are generalized CRUD methods that take this endpoint as an argument.
  ///  for example a users table is like this:
  ///  this.dataService.createItem('users', userData).subscribe( ... );
  ///  this.dataService.getItem('users').subscribe( ... );
  ///  this.dataService.updateItem('users', userId, updatedUserData).subscribe( ... );
  ///  this.dataService.deleteItem('users', userId).subscribe( ... );

  
  createItem(endpoint: string, itemData: any): Observable<any> {
    return this.http.post(`${this.apiRoot}/${endpoint}/create.php`, itemData);
  }

  getItem(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiRoot}/${endpoint}/read.php`);
  }

  updateItem(endpoint: string, itemId: number, itemData: any): Observable<any> {
    return this.http.put(`${this.apiRoot}/${endpoint}/update.php`, { id: itemId, ...itemData });
  }

  deleteItem(endpoint: string, itemId: number): Observable<any> {
    return this.http.delete(`${this.apiRoot}/${endpoint}/delete.php?id=${itemId}`);
  }
}
