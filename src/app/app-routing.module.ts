import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

  // referrer section
  { path: 'referrer', component: ReferrerComponent, canActivate: [AuthGuard], data: { role: 'Referrer' } },
  { path: 'referrer/businesses', component: BusinessesComponent, canActivate: [AuthGuard], data: { role: 'Referrer' } },

  // admin section.
  // ToDo change all these routes to be children for 'admin' parent
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
  { path: 'businesses', component: BusinessesComponent, canActivate: [AuthGuard] },
  { path: 'events', component: EventsViewerComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersViewerComponent, canActivate: [AuthGuard] },

  { path: '**', component: HomeComponent, canActivate: [AuthGuard] } // HomeComponent should be admin dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
