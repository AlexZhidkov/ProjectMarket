import { Component, OnInit } from '@angular/core';
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

  constructor(private firestore: FirestoreService<any>) { }

  ngOnInit() {
    this.firestore.setCollection('businesses', ref => ref.where('isSubmitted', '==', true));
    this.businesses = this.firestore.list();
    this.businesses.subscribe(e => {
      this.isLoading = false;
    });
  }

}
