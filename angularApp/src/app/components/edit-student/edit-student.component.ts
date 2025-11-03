import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../classes/student';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-edit-student',
  imports: [],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent implements OnInit{

  studentId!: string;
  //studentId = "60b1c1f4e8a4c0000fbbf01d"
  student: Student = { id:"", name:"", surname:"", courses:[]};
  error = ""

  constructor(
    private readonly route: ActivatedRoute,
    private studentService: StudentService,
    private courseService: CourseService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('Test ID:', this.studentId);
      this.studentId = params['id']; // Access the 'id' parameter from the URL
    });

      this.studentService.getStudentById(this.studentId).subscribe(
        (data: Student) => {
          this.student = data
          },
        (err) => {
          console.error('Error fetching student:', err);
          this.error = err;
        }
      );

    }
  }


