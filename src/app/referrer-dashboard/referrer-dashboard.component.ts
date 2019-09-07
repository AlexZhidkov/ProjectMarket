import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { DashboardButton } from '../dashboard-button/dashboard-button.component';
import { Business } from '../model/business';
import { Project } from '../model/project';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-referrer-dashboard',
  templateUrl: './referrer-dashboard.component.html',
  styleUrls: ['./referrer-dashboard.component.css']
})
export class ReferrerDashboardComponent implements OnInit {
  logoUrl: string;
  refButtons: DashboardButton[] = [
    {
      label: 'Add Business',
      routerLink: 'business/form',
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
              private afs: AngularFirestore,
              private afStorage: AngularFireStorage,
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

    this.afs.doc('users/' + this.authService.currentUser().uid).get()
      .subscribe(userSnapshot => {
        const storeRef = this.afStorage.ref('logos/' + userSnapshot.data().logoFileName);
        storeRef.getDownloadURL().subscribe(url => {
          this.logoUrl = url;
        });
      });
  }
}
