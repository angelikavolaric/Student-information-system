import { Component } from '@angular/core';
import { Student } from '../../classes/student';
import { Course } from '../../classes/course';
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
import { CheckboxModule } from 'primeng/checkbox';
import { generate } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-student',
  imports: [CommonModule, ButtonModule, TableModule, MessageModule, InputGroupModule, InputGroupAddonModule, FormsModule, InputTextModule, CheckboxModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {


  studentId = "";
  student: Student = {id:"", name:"", surname:"", gender:"", birthDate: "", email:"", phoneNumber:"", 
    address: {homeAddress:"", postalCode:"", city:"", country:""}, courses:[]};
  error = "";
  allCourses: Course[] = []
  submitted = false

  errMsgs: any[] = [];

   showWarning() {
    this.errMsgs = [{ severity: 'warn', summary: 'Warning', detail: this.error }];
  }


  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
  ) { }

  ngOnInit(): void {
    

      /*this.studentService.getStudentById(this.studentId).subscribe(
        (data: Student) => {
          this.student = data;
          },
        (err) => {
          console.error('Error fetching student:', err);
          this.error = 'Error fetching student with id ' + this.studentId
            this.showWarning()

        }
      );*/

        
        this.student.id = this.generateId()

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
      this.submitted = true
      console.log(this.student)
      this.student.gender = this.student.gender.toUpperCase() //if gender is lowercase - change
      
      //this.checkValues()
      /*this.studentService.addStudent(this.student).subscribe( //transform id numbers in course name
          (data: Student) => {
            console.log("Student sucessfuly updated")
          },(err) => {
            console.error('Error course data:', err);
            this.error = err;
          }
         )*/
    }

    checkValues(){
      if (this.student.email &&  !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.student.email)) {
        //this.formError = "Please enter a valid email.";
        console.log("Invalid email")
        return;
      }

      if (this.student.phoneNumber &&  !/^[0-9]*$/.test(this.student.phoneNumber)) {
        //this.formError = "Please enter a valid email.";
        console.log("Invalid phone number")
        return;
      }
      
      if(!/^(M|F)$/.test(this.student.gender)) {
        console.log("Invalid gender " + this.student.gender)
        return;
      }

      /*if(!/^(M|F)$/.test(this.student.birthDate)) {
        console.log("Invalid gender " + this.student.gender)
      }*/
    }

    generateId(){
      var generatedId = uuidv4()
      generatedId = generatedId.replaceAll('-', '').substring(0,23)
      return generatedId
    }

  }


