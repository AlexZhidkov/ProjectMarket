import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BusinessOnboardComponent } from './business-onboard/business-onboard.component';
import { BusinessViewComponent } from './business-view/business-view.component';
import { BusinessComponent } from './business/business.component';
import { BusinessesComponent } from './businesses/businesses.component';
import { EventsViewerComponent } from './events-viewer/events-viewer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReferrerComponent } from './referrer/referrer.component';
import { AuthGuard } from './services/auth.guard';
import { StudentConfirmationScreenComponent } from './student-confirmation-screen/student-confirmation-screen.component';
import { StudentOnboardComponent } from './student-onboard/student-onboard.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { StudentComponent } from './student/student.component';
import { StudentsComponent } from './students/students.component';
import { UsersViewerComponent } from './users-viewer/users-viewer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: StudentComponent, canActivate: [AuthGuard] },
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
  { path: 'student', component: StudentComponent, canActivate: [AuthGuard] },
  { path: 'student/form', component: StudentOnboardComponent, canActivate: [AuthGuard], data: { role: 'Student' } },
  { path: 'student/form/confirmation', component: StudentConfirmationScreenComponent },
  { path: 'student/signup', component: StudentOnboardComponent, canActivate: [AuthGuard], data: { role: 'Student' } },
  { path: 'student/:id', component: StudentViewComponent, canActivate: [AuthGuard] },
  { path: 'businesses', component: BusinessesComponent, canActivate: [AuthGuard] },
  { path: 'business', component: BusinessComponent, canActivate: [AuthGuard] },
  { path: 'business/form', component: BusinessOnboardComponent, canActivate: [AuthGuard] },
  { path: 'business/form/:id', component: BusinessOnboardComponent, canActivate: [AuthGuard] },
  { path: 'business/:id', component: BusinessViewComponent, canActivate: [AuthGuard] },
  { path: 'referrer', component: ReferrerComponent, canActivate: [AuthGuard], data: { role: 'Referrer' } },
  { path: 'referrer/businesses', component: BusinessesComponent, canActivate: [AuthGuard], data: { role: 'Referrer' } },
  { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'events', component: EventsViewerComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersViewerComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
