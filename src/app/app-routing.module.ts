import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessOnboardComponent } from './business-onboard/business-onboard.component';
import { BusinessComponent } from './business/business.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StudentOnboardComponent } from './student-onboard/student-onboard.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'student', component: StudentComponent },
  { path: 'student/form', component: StudentOnboardComponent },
  { path: 'business', component: BusinessComponent },
  { path: 'business/form', component: BusinessOnboardComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
