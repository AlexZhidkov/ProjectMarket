import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})
export class BusinessesComponent implements OnInit {
  isLoading = true;
  businesses: Observable<any[]>;

  constructor(private route: ActivatedRoute, private firestore: FirestoreService<any>) { }

  ngOnInit() {
    const urlSegments = this.route.snapshot.url;
    if (urlSegments[0].path === 'referrer') {
      this.firestore.setCollection('businesses', ref => ref
        .where('isSubmitted', '==', true)
        .where('createdBy.uid', '==', localStorage.getItem('uid')));
    } else {
      this.firestore.setCollection('businesses', ref => ref
        .where('isSubmitted', '==', true));
    }
    this.businesses = this.firestore.list();
    this.businesses.subscribe(e => {
      this.isLoading = false;
    });
  }

}
