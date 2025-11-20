import { Component, inject } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../classes/student';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-overview',
  providers: [MessageService],
  imports: [
    CommonModule, 
    ButtonModule, 
    TableModule,
    SpeedDialModule,
    PaginatorModule,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  private router = inject(Router)
  menuItems!: MenuItem[]; // menu items for edit / delete student

  error: any;
  selectedStudent: Student = {id:"", name:"", surname:"", gender:"M", birthDate:"", email:"", phoneNumber:"", 
    address: {homeAddress:"", postalCode:"", city:"", country:""}, courses:[]};
  rows = 20;
  

  students: Student[] = []
  stu: Student= {id:"", name:"", surname:"", gender:"M", birthDate:"", email:"", phoneNumber:"", 
    address: {homeAddress:"", postalCode:"", city:"", country:""}, courses:[]};

  
  currentPage = 1;
  first= 0; //index of first shown on page
  constructor(private studentService: StudentService,
  ){}

  //paginator
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

  //row expansion
  expandedRows: { [key: string]: boolean } = {};

  onRowExpand(student: any){
    this.expandedRows[student.id] = true;
  }

  onRowCollapse(student: any){
    this.expandedRows[student.id] = false;
  }

  openMenu(student: Student){ //more button
    this.menuItems = [
            {
                label: 'Edit',
                icon: "pi pi-pencil",
                command: () => {
                  this.router.navigate(['/edit', student.id]);
                }
               
            },
            {
                label: 'Delete',
                icon: "pi pi-trash",
                command: () => {
                  this.router.navigate(['/delete', student.id]);
                }
            }
        ];
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
