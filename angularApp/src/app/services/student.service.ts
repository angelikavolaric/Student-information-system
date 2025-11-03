import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Student } from '../classes/student';
import { Course } from '../classes/course';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

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
    const params = new HttpParams().set('id', Id);
    return this.httpClient.get<Student>(`${this.studentDataUrl}/${Id}`, { params }).pipe(
      catchError(this.handleError));
  };

  /*updateStudent(Id: string, name: string, surname: string, courses: Course[]): Observable<Object> {
    return null;
  };

  addStudent(Id: string, name: string, surname: string, courses: Course[]): Observable<Object> {
    return null;
  };

  deleteStudent(Id: string): Observable<undefined> {
    return null;
  };*/

   private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Network error:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }
    return throwError(() => new Error('Something went wrong. Please try again later.' + error.status));
  }
}

