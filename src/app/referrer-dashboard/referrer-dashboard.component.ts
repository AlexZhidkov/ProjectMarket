import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Business } from '../model/business';
import { Project } from '../model/project';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { DashboardButton } from '../dashboard-button/dashboard-button.component';

@Component({
  selector: 'app-referrer-dashboard',
  templateUrl: './referrer-dashboard.component.html',
  styleUrls: ['./referrer-dashboard.component.css']
})
export class ReferrerDashboardComponent implements OnInit {

  refButtons: DashboardButton[] = [
    {
      label: 'Add Business',
      routerLink: '/business/form',
      icon: 'add'
    },
    {
      label: 'View Businesses',
      routerLink: 'businesses',
      icon: 'view_list'
    },
    {
      label: 'View Projects',
      routerLink: 'projects',
      icon: 'view_list'
    }
  ];

  recentActivities = [
    {
      name: 'Business submitted form',
      updated: new Date('1/28/16')
    },
    {
      name: 'Business re-submitted form',
      updated: new Date('1/20/16')
    },
    {
      name: 'Recommended changes',
      updated: new Date('1/15/16')
    },
  ];


  isLoading = true;
  draftBusinesses: Observable<Business[]>;
  projects: Observable<Project[]>;

  constructor(private authService: AuthService,
    private businessStore: FirestoreService<Business>,
    private projectStore: FirestoreService<Project>,
  ) { }

  ngOnInit() {
    this.businessStore.setCollection('businesses', ref => ref
      .where('createdBy.uid', '==', this.authService.currentUser().uid)
      .where('submittedOn', '==', null)
    );
    this.draftBusinesses = this.businessStore.list();
    this.draftBusinesses.subscribe(e => {
      this.isLoading = false;
    });

    this.projectStore.setCollection('projects');
    this.projects = this.projectStore.list();
    this.projects.subscribe(e => {
    });
  }

}
