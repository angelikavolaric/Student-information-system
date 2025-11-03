import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../classes/student';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';

import { ButtonModule } from 'primeng/button';
import { Paginator } from 'primeng/paginator';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-overview',
  imports: [CommonModule, ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  error: any;

  constructor(private studentService: StudentService,){}

  students: Student[] = []
  stu: Student= {id:"", name:"", surname:"", courses:[]};

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
