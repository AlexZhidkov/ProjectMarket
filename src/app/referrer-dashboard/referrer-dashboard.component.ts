import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { DashboardButton } from '../dashboard-button/dashboard-button.component';
import { AppEvent } from '../model/app-event';
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

  isLoading = true;
  appEvents: Observable<AppEvent[]>;

  constructor(private authService: AuthService,
              private afs: AngularFirestore,
              private afStorage: AngularFireStorage,
              private eventsStore: FirestoreService<AppEvent>,
  ) { }

  ngOnInit() {
    this.eventsStore.setCollection('events', ref => ref
      .where('referrer.uid', '==', this.authService.currentUser().uid)
      .orderBy('createdOn', 'desc')
      .limit(100)
    );
    this.appEvents = this.eventsStore.list();
    this.appEvents.subscribe(e => {
      this.isLoading = false;
    });

    this.afs.doc('users/' + this.authService.currentUser().uid).get()
      .subscribe(userSnapshot => {
        const logoFileName = userSnapshot.data().logoFileName;
        if (logoFileName) {
          const storeRef = this.afStorage.ref('logos/' + logoFileName);
          storeRef.getDownloadURL().subscribe(url => {
            this.logoUrl = url;
          });
        }
      });
  }
}
