import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { BusinessDashboardComponent } from './business-dashboard/business-dashboard.component';
import { BusinessOnboardComponent } from './business-onboard/business-onboard.component';
import { BusinessViewComponent } from './business-view/business-view.component';
import { BusinessComponent } from './business/business.component';
import { BusinessesComponent } from './businesses/businesses.component';
import { EventsViewerComponent } from './events-viewer/events-viewer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReferrerDashboardComponent } from './referrer-dashboard/referrer-dashboard.component';
import { ReferrerComponent } from './referrer/referrer.component';
import { AuthGuard } from './services/auth.guard';
import { StudentConfirmationScreenComponent } from './student-confirmation-screen/student-confirmation-screen.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentOnboardComponent } from './student-onboard/student-onboard.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { StudentComponent } from './student/student.component';
import { StudentsComponent } from './students/students.component';
import { UsersViewerComponent } from './users-viewer/users-viewer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'student', component: StudentComponent, canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { authRoles: ['student', 'admin'], newUserRole: 'student' },
    children: [
      { path: 'signup', component: StudentOnboardComponent, },
      { path: 'form', component: StudentOnboardComponent, },
      { path: 'form/confirmation', component: StudentConfirmationScreenComponent },
      { path: 'view/:id', component: StudentViewComponent },
      { path: '', component: StudentDashboardComponent }
    ]
  },
  {
    path: 'business',
    component: BusinessComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { authRoles: ['business', 'admin'], newUserRole: 'business' },
    children: [
      { path: 'form', component: BusinessOnboardComponent },
      { path: 'form/:id', component: BusinessOnboardComponent },
      { path: 'view/:id', component: BusinessViewComponent },
      { path: '', component: BusinessDashboardComponent }
    ]
  },
  {
    path: 'referrer',
    component: ReferrerComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { authRoles: ['referrer', 'admin'], newUserRole: 'referrer' },
    children: [
      { path: 'projects/:id', component: ProjectViewComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'businesses', component: BusinessesComponent },
      { path: '', component: ReferrerDashboardComponent }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { authRoles: ['admin'] },
    children: [
      { path: 'project', component: ProjectComponent },
      { path: 'projects/:id', component: ProjectComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'businesses', component: BusinessesComponent },
      { path: 'events', component: EventsViewerComponent },
      { path: 'users', component: UsersViewerComponent },
      { path: '', component: AdminDashboardComponent }
    ]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
