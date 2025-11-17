import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../classes/student';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Course } from '../../classes/course';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-student',
  providers: [MessageService],
  imports: [
    CommonModule, 
    ButtonModule, 
    TableModule, 
    MessageModule, 
    InputGroupModule, 
    InputGroupAddonModule, 
    FormsModule, 
    InputTextModule, 
    CheckboxModule,
    ToastModule,
    ],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent implements OnInit{


  studentId = "";
  student: Student = {id:"", name:"", surname:"", gender:"M", birthDate: "", email:"", phoneNumber:"", 
    address: {homeAddress:"", postalCode:"", city:"", country:""}, courses:[]};
  error = "";
  allCourses: Course[] = []

  errMsgs: any[] = [];

  showWarning() {
    this.errMsgs = [{ severity: 'warn', summary: 'Warning', detail: this.error }];
  }

  showSuccess() {
  this.messageService.add({severity:'success', summary:'Success', detail:'Succesfully saved student'});
  }

  showFail() {
    this.messageService.add({severity:'error', summary:'Error', detail:'Edit student failed'});
  }


  constructor(
    private readonly route: ActivatedRoute,
    private studentService: StudentService,
    private courseService: CourseService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      
      let tempId = params.get('id');
      if(tempId != null){
        this.studentId = tempId
      } else {
        this.error = "Student id is not valid, cannot fetch data"
        this.showWarning()
        console.log("Student id is undefined, cannot fetch data")
      }
    });

    

      this.studentService.getStudentById(this.studentId).subscribe(
        (data: Student) => {
          this.student = data;
          },
        (err) => {
          console.error('Error fetching student:', err);
          this.error = 'Error fetching student with id ' + this.studentId
            this.showWarning()

        }
      );

        this.courseService.getAllCourses().subscribe(
        (data: Course[]) => {
          this.allCourses = data;
          },
        (err) => {
          console.error('Error fetching student:', err);
          this.error = 'Error fetching student with id ' + this.studentId
            this.showWarning()

        }
    );

    }

    onSubmit(): void {
      this.studentService.updateStudent(this.student).subscribe( //transform id numbers in course name
          (data: Student) => {
            console.log("Student sucessfuly updated")
            this.showSuccess()
          },(err) => {
            console.error('Error course data:', err);
            this.showFail()
            this.error = err;
          }
         )
    }

  }


