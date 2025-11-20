import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Student } from '../classes/student';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly studentDataUrl = 'http://localhost:3000/students';

    constructor(
    private httpClient: HttpClient,
  ){}


  getAllStudents(): Observable<any> {
    return this.httpClient.get<Student[]>(`${this.studentDataUrl}`).pipe(
      catchError(this.handleError)
    );
  };

  getStudentById(Id: string): Observable<Student> {
    return this.httpClient.get<Student>(`${this.studentDataUrl}/${Id}`).pipe(
      catchError(this.handleError));
  };

  updateStudent(student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`${this.studentDataUrl}/${student.id}`, student).pipe(
      catchError(this.handleError));
  };

  addStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(`${this.studentDataUrl}`, student).pipe(
      catchError(this.handleError));
  };

  deleteStudent(student: Student): Observable<Student> {
    return this.httpClient.delete<Student>(`${this.studentDataUrl}/${student.id}`).pipe(
      catchError(this.handleError));
  };

   private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Network error:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }
    return throwError(() => new Error('Something went wrong. Please try again later.' + error.status));
  }
}

