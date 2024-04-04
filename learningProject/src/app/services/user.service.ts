import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = "http://localhost:8000/user"
  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  getUserIdByName(userName: string): Observable<any> {
    const url = `${this.apiUrl}?userName=${userName}`;
    return this.http.get<any>(url);
  }
  addUser(user: any): Observable<any> {
    const url = `${this.apiUrl}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(url, user, { headers })
    .pipe(
      catchError(error => {
        console.error('Error adding user:', error);
        return throwError(error);
      })
    );
  }
  getUserIdByEmail(email:string) :Observable<any> {    
    const url = `${this.apiUrl}/email?email=${email}`;
    console.log(url);
    return this.http.get<any>(url);
  }
}
