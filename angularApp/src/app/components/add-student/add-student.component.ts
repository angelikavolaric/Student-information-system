import { Component, ViewChild } from '@angular/core';
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
import { FormsModule, NgModel } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { v4 as uuidv4 } from 'uuid';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog'; 

@Component({
  selector: 'app-add-student',
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
    RouterModule,
    DialogModule,
  ],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {

  studentId = "";
  emptyStudent: Student = {id:"", name:"", surname:"", gender:"", birthDate: "", email:"", phoneNumber:"", 
    address: {homeAddress:"", postalCode:"", city:"", country:""}, courses:[]};
  student = JSON.parse(JSON.stringify(this.emptyStudent));
  error = "";
  allCourses: Course[] = []
  submitted = false

  todayDate = new Date().toISOString().split('T')[0];

  errMsgs: any[] = [];
  router: any;
  addStudentPopup = false

  showWarning() {
    this.errMsgs = [{ severity: 'warn', summary: 'Warning', detail: this.error }];
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary:'Success', detail:'Succesfully added student with id: ' + this.student.id});
  }

  showFail() {
    this.messageService.add({severity:'error', summary:'Error', detail:'Add student failed'});
  }

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private messageService: MessageService
  ) {
   }

  ngOnInit(): void {
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

    @ViewChild('name') name!: NgModel;
    @ViewChild('surname') surname!: NgModel;
    @ViewChild('gender') gender!: NgModel;
    @ViewChild('birthdate') birthdate!: NgModel;
    @ViewChild('email') email!: NgModel;
    @ViewChild('phone') phone!: NgModel;
    @ViewChild('street') street!: NgModel;
    @ViewChild('post') post!: NgModel;
    @ViewChild('city') city!: NgModel;
    @ViewChild('country') country!: NgModel;

    validInputs(){ //checks if all inputs are valid
      if(this.name.valid &&
        this.surname.valid &&
        this.gender.valid &&
        this.birthdate.valid &&
        this.email.valid &&
        this.phone.valid &&
        this.street.valid &&
        this.post.valid &&
        this.city.valid &&
        this.country.valid
      )
      { return true
      }
      return false
    }

    onSubmit(): void {
      this.submitted = true
      console.log(this.student)
      this.student.gender = this.student.gender.toUpperCase() //if gender is lowercase - change
      
      if(this.validInputs()){
        this.studentService.addStudent(this.student).subscribe( //transform id numbers in course name
          (data: Student) => {
            this.showSuccess()
            console.log("Student sucessfuly added")
            this.addStudentPopup = true
          },(err) => {
            console.error('Error course data:', err);
            this.showFail()
            this.error = err;
          }
         )
      } else {
        this.showFail()
        console.error('Cannot add student, invalid inputs');
      }
    }
    
    generateId(){ //generate id with 24 char
      var generatedId = uuidv4()
      generatedId = generatedId.replaceAll('-', '').substring(0,24)
      return generatedId
    }

    reloadPage(){
      window.location.reload();
    }

  }


