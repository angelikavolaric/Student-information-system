import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { Student } from '../../classes/student';
import { Address } from '../../classes/address';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-overview',
  imports: [CommonModule, ButtonModule, TableModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  error: any;
  selectedStudent: Student = {id:"", name:"", surname:"", gender:"M", birthDate:"", email:"", phoneNumber:"", 
    address: {homeAddress:"", postalCode:"", city:"", country:""}, courses:[]};
  rows = 20;
  constructor(private studentService: StudentService,){}

  students: Student[] = []
  stu: Student= {id:"", name:"", surname:"", gender:"M", birthDate:"", email:"", phoneNumber:"", 
    address: {homeAddress:"", postalCode:"", city:"", country:""}, courses:[]};

  
  currentPage = 1;
  first= 0; //index of first shown on page

  reset(): boolean {
    return this.currentPage === 1;
  }

  pageChange(event: any) {
  this.currentPage = event.page + 1;
  this.rows = event.rows;
}

  next(): boolean {
    return this.currentPage === 1;
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === 1;
  }

  prev() {
    if (!this.isFirstPage()) {
      this.currentPage--;
    }
  }

  ngOnInit(): void {
   this.studentService.getAllStudents().subscribe(
          (data: Student[]) => {
            this.students = data

            },
          (err) => {
            console.error('Error fetching student:', err);
            this.error = err;
          }
        );

    
    }
    
}
