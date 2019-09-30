import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Business } from '../model/business';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})
export class BusinessesComponent implements OnInit {
  isLoading = true;
  businesses: Observable<Business[]>;

  constructor(private route: ActivatedRoute, private outlet: RouterOutlet, private firestore: FirestoreService<Business>) { }

  ngOnInit() {
    // tslint:disable-next-line:no-string-literal
    if (this.outlet && this.outlet.activatedRouteData && this.outlet.activatedRouteData['isReferrer']) {
      this.firestore.setCollection('businesses', ref => ref
        .where('referrer.uid', '==', localStorage.getItem('uid')));
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
