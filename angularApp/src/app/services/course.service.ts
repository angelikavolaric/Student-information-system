import { Injectable } from '@angular/core';
import { Course } from '../classes/course';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
    private readonly coursesDataUrl = 'http://localhost:3000/courses';

    constructor(
    private httpClient: HttpClient,
  ){}


  getAllCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${this.coursesDataUrl}`).pipe(
      catchError(this.handleError)
    );
  };

  getCoursesById(Id: string): Observable<Course> {
    return this.httpClient.get<Course>(`${this.coursesDataUrl}/${Id}`).pipe(
      catchError(this.handleError));
  };

  getNamesCoursesofStudent(courses: string[]): Observable<string[]> {
    let allCoursesNames: string[] = [];
    for(let i in courses){ //iterate trough array of course ids
      this.getCoursesById(courses[i]).subscribe( //get course by id
        (data: Course) => {allCoursesNames.push(data.name)});
      catchError(this.handleError)
      }
      return of(allCoursesNames); //pack to observable
    }
    

    private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Network error:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }
    return throwError(() => new Error('Something went wrong. Please try again later.' + error.status));
  }

}
