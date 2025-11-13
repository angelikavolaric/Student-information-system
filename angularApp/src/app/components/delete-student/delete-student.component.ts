import { Component, OnInit } from '@angular/core';
import { Student } from '../../classes/student';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog'; 


@Component({
  selector: 'app-delete-student',
  imports: [TableModule, MessageModule, ButtonModule, CommonModule, DialogModule,],
  templateUrl: './delete-student.component.html',
  styleUrl: './delete-student.component.css'
})
export class DeleteStudentComponent implements OnInit{

  studentId = "";
  student: Student = {id:"", name:"", surname:"", gender:"M", birthDate: "", email:"", phoneNumber:"", 
    address: {homeAddress:"", postalCode:"", city:"", country:""}, courses:[]};
  error = "";
  errMsgs: any[] = [];
  visible = false;

  

  constructor(
      private readonly route: ActivatedRoute,
      private studentService: StudentService,
    ) { }

  showWarning() {
    this.errMsgs = [{ severity: 'warn', summary: 'Warning', detail: this.error }];
  }

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
    }

    deleteStudent(){
      console.log("deleteStudent")
      this.studentService.deleteStudent(this.student).subscribe( //transform id numbers in course name
        (data: Student) => {
          console.log("Student sucessfuly deleted")
          this.visible = false
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
