import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private urlCoursesFile = '../../../data/courses.json';
}
