import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Business} from '../model/business';
import {AuthService} from '../services/auth.service';
import {FirestoreService} from '../services/firestore.service';

@Component({
  selector: 'app-referrer-dashboard',
  templateUrl: './referrer-dashboard.component.html',
  styleUrls: ['./referrer-dashboard.component.css']
})
export class ReferrerDashboardComponent implements OnInit {

  isLoading = true;
  draftBusinesses: Observable<Business[]>;

  constructor(private authService: AuthService, private firestore: FirestoreService<Business>) { }

  ngOnInit() {
    this.firestore.setCollection('businesses', ref => ref
        .where('createdBy.uid', '==', this.authService.currentUser().uid)
        .where('submittedOn', '==', null)
    );
    this.draftBusinesses = this.firestore.list();
    this.draftBusinesses.subscribe(e => {
      this.isLoading = false;
    });

  }

}
