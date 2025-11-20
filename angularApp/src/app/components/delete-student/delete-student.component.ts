import { Component, OnInit } from '@angular/core';
import { Student } from '../../classes/student';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog'; 
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-delete-student',
  providers: [MessageService],
  imports: [
    TableModule, 
    MessageModule, 
    ButtonModule, 
    CommonModule, 
    DialogModule, 
    ToastModule, 
    RouterModule],
  templateUrl: './delete-student.component.html',
  styleUrl: './delete-student.component.css'
})
export class DeleteStudentComponent implements OnInit{

  studentId = "";
  student: Student = {id:"", name:"", surname:"", gender:"", birthDate: "", email:"", phoneNumber:"", 
    address: {homeAddress:"", postalCode:"", city:"", country:""}, courses:[]};
  error = "";
  errMsgs: any[] = [];
  visible = false; //popup for checking if you want to delete student
  routingPopup = false; //popup for going to ovrview
  
  constructor(
      private readonly route: ActivatedRoute,
      private studentService: StudentService,
      private messageService: MessageService,
    ) { }

  showWarning() {
    this.errMsgs = [{ severity: 'warn', summary: 'Warning', detail: this.error }];
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary:'Success', detail:'Student sucessfully deleted'});
  }

  ngOnInit(): void {
      
    this.route.paramMap.subscribe(params => {  
      let tempId = params.get('id');
      if(tempId != null){ //check if no student id
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
  }

  deleteStudent(){
    this.studentService.deleteStudent(this.student).subscribe( //transform id numbers in course name
      (data: Student) => {
        this.showSuccess()
        this.visible = false
        this.routingPopup = true 
      },(err) => {
        console.error('Error course data:', err);
        this.showWarning()
        this.error = err;
      }
      )
  }

  deleteStudentPopup(){
    this.visible = true;
  }

    
}
