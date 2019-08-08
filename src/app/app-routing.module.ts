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
  { path: 'profile', component: StudentComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'student', component: StudentComponent },
  { path: 'student/form', component: StudentOnboardComponent, canActivate: [AuthGuard], data: { role: 'Student' } },
  { path: 'student/form/confirmation', component: StudentConfirmationScreenComponent },
  { path: 'student/signup', component: StudentOnboardComponent, canActivate: [AuthGuard], data: { role: 'Student' } },
  { path: 'student/:id', component: StudentViewComponent },
  { path: 'businesses', component: BusinessesComponent },
  { path: 'business', component: BusinessComponent },
  { path: 'business/form', component: BusinessOnboardComponent },
  { path: 'business/form/:id', component: BusinessOnboardComponent },
  { path: 'business/:id', component: BusinessViewComponent },
  { path: 'referrer', component: ReferrerComponent, canActivate: [AuthGuard], data: { role: 'Referrer' } },
  { path: 'referrer/businesses', component: BusinessesComponent, canActivate: [AuthGuard], data: { role: 'Referrer' } },
  { path: 'project', component: ProjectComponent },
  { path: 'project/:id', component: ProjectComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'events', component: EventsViewerComponent },
  { path: 'users', component: UsersViewerComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
