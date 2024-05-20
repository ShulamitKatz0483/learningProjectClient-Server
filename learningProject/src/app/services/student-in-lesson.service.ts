import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentInLessonService {

  private apiUrl = 'http://localhost:8000/studentInLesson'; 

  constructor(private http: HttpClient) { }

 
  addStudentToLesson(data:any): Observable<any> {
    const url = `${this.apiUrl}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(url, data)
    .pipe(
      catchError(error => {
        console.error('Error adding user:', error);
        return throwError(error);
      })
    );
  }
  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

}
