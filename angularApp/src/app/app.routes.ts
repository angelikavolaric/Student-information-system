import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { DeleteStudentComponent } from './components/delete-student/delete-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';

export const routes: Routes = [
    { path: 'add', component: AddStudentComponent },
    { path: 'delete/:id', component: DeleteStudentComponent },
    { path: 'edit/:id', component: EditStudentComponent },
    { path: 'overview', loadComponent: () => import('./components/overview/overview.component').then(m => m.OverviewComponent)}, //lazy loading component
    { path: '**', redirectTo: 'overview'},
];
