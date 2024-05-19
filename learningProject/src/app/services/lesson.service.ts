import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  apiUrl: string = "http://localhost:8000/lesson"

  constructor(private http: HttpClient) { }
  getData() :Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  updateLesson(lesson: any): Observable<any> {
    const url = `${this.apiUrl}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put<any>(url, lesson, { headers })
    .pipe(
      catchError(error => {
        console.error('Error update lsson:', error);
        return throwError(error);
      })
    );
  }
  deleteLesson(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`; 
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<any>(url, { headers }).pipe(
      catchError(error => {
        console.error('Error deleting lesson:', error);
        return throwError(error);
      })
    );
  }
  addLesson(data:any): Observable<any> {
    const url = `${this.apiUrl}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(url, data)
    .pipe(
      catchError(error => {
        console.error('Error adding lesson:', error);
        return throwError(error);
      })
    );
  }
}
