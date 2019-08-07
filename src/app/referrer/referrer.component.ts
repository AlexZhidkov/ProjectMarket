import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Business } from '../model/business';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-referrer',
  templateUrl: './referrer.component.html',
  styleUrls: ['./referrer.component.css']
})
export class ReferrerComponent implements OnInit {
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
