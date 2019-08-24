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
    data: { authRoles: ['student', 'admin'] },
    children: [
      { path: 'form', component: StudentOnboardComponent, },
      { path: 'signup', component: StudentOnboardComponent, data: { role: 'Student' } },
      { path: 'form/confirmation', component: StudentConfirmationScreenComponent },
      { path: 'student/:id', component: StudentViewComponent },
      { path: '', component: StudentDashboardComponent, data: { authRoles: ['all'] }, }
    ]
  },
  {
    path: 'business',
    component: BusinessComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { authRoles: ['business', 'admin'] },
    children: [
      { path: 'form', component: BusinessOnboardComponent },
      { path: 'form/:id', component: BusinessOnboardComponent },
      { path: ':id', component: BusinessViewComponent },
      { path: '', component: BusinessDashboardComponent, data: { authRoles: ['all'] }, }
    ]
  },
  {
    path: 'referrer',
    component: ReferrerComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { authRoles: ['referrer', 'admin'] },
    children: [
      { path: 'businesses', component: BusinessesComponent, data: { role: 'Referrer' } },
      { path: '', component: ReferrerDashboardComponent, data: { role: 'Referrer' } }
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
      { path: 'project/:id', component: ProjectComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'businesses', component: BusinessesComponent },
      { path: 'events', component: EventsViewerComponent },
      { path: 'users', component: UsersViewerComponent },
      { path: '', component: AdminDashboardComponent }
    ]
  },
  { path: '**', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
