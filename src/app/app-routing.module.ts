import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { StudentOnboardComponent } from './student-onboard/student-onboard.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'student', component: StudentComponent },
  { path: 'student/form', component: StudentOnboardComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
