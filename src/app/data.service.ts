import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  //this might be wrong
  private apiRoot: string = environment.apiUrl;  

  constructor(private http: HttpClient) {
    alert(`constructor:${this.apiRoot}`);
   }  
  createItem(endpoint: string, itemData: any): Observable<any> {
    console.log("entered createItem");
    console.log(`entered createItem:${this.apiRoot}/${endpoint}/create.php`);
    return this.http.post(`${this.apiRoot}/${endpoint}/create.php`, itemData).pipe(
      catchError(error=>{
        console.error('An error occured in createItem:', error);
        return throwError(() => error);
      })
    );
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
