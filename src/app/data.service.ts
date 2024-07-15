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

  private apiRoot: string = environment.apiUrl;
  
  constructor(private http: HttpClient) {  }  

/**
 * 
 * @param endpoint this should be the name of the table but in lowercase and is the folder that actually contains the endpoints your looking for
 * @param itemData this is the information that will be sent to the api
 * @returns whatever the api returns else it returns an error
 */
  createItem(endpoint: string, itemData: any): Observable<any> {
    return this.http.post(`${this.apiRoot}/${endpoint}/create.php`, itemData).pipe(
      catchError(error=>{
        console.error('An error occured in createItem:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * 
   * @param endpoint this should be the name of the table but in lowercase and is the folder that actually contains the endpoints your looking for
   * @returns items from the table else it returns an error
   */
  getItem(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiRoot}/${endpoint}/read.php`).pipe(
      catchError(error=>{
        console.error('An error occured in createItem:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * 
   * @param endpoint this should be the name of the table but in lowercase and is the folder that actually contains the endpoints your looking for
   * @param itemId the sql id of the item
   * @param itemData this is the updated information that will be sent to the api
   * @returns returns the updated item from the table else it returns an error
   */
  updateItem(endpoint: string, itemId: number, itemData: any): Observable<any> {
    return this.http.put(`${this.apiRoot}/${endpoint}/update.php`, { id: itemId, ...itemData }).pipe(
      catchError(error=>{
        console.error('An error occured in createItem:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * 
   * @param endpoint this should be the name of the table but in lowercase and is the folder that actually contains the endpoints your looking for
   * @param itemId the sql id of the item
   * @returns returns the deleted item from the table else it returns an error
   */
  deleteItem(endpoint: string, itemId: number): Observable<any> {
    const url = `${this.apiRoot}/${endpoint}/delete.php`;
    const options = {
      headers: { 'Constent-Type': 'application/json' },
      body: { CustomerID: itemId }
    };
    console.log('DELETE request URL:', url);
    console.log('DELETE request options:', options);

    return this.http.delete(url, options).pipe(
      catchError(error => {
        console.error('An error occurred in deleteItem:', error);
        return throwError(() => error);
      })
    );
}

}
