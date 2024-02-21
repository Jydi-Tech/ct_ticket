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
  

  constructor(private http: HttpClient) {  }  

  //C in crud endpoint is the folder name item data is the data to be passed in
  createItem(endpoint: string, itemData: any): Observable<any> {
    return this.http.post(`${this.apiRoot}/${endpoint}/create.php`, itemData).pipe(
      catchError(error=>{
        console.error('An error occured in createItem:', error);
        return throwError(() => error);
      })
    );
  }

  getItem(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiRoot}/${endpoint}/read.php`).pipe(
      catchError(error=>{
        console.error('An error occured in createItem:', error);
        return throwError(() => error);
      })
    );
  }

  updateItem(endpoint: string, itemId: number, itemData: any): Observable<any> {
    return this.http.put(`${this.apiRoot}/${endpoint}/update.php`, { id: itemId, ...itemData }).pipe(
      catchError(error=>{
        console.error('An error occured in createItem:', error);
        return throwError(() => error);
      })
    );
  }

  deleteItem(endpoint: string, itemId: number): Observable<any> {
    return this.http.delete(`${this.apiRoot}/${endpoint}/delete.php?id=${itemId}`).pipe(
      catchError(error=>{
        console.error('An error occured in createItem:', error);
        return throwError(() => error);
      })
    );
  }
}
