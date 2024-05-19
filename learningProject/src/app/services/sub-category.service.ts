
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  apiUrl: string = "http://localhost:8000/subCategory"

  constructor(private http: HttpClient) { }
  getData() :Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  updateSubCategory(subCategory: any): Observable<any> {
    const url = `${this.apiUrl}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put<any>(url, subCategory, { headers })
    .pipe(
      catchError(error => {
        console.error('Error update subCategory:', error);
        return throwError(error);
      })
    );
  }
}
