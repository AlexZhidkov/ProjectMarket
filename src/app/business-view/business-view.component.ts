import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Business } from '../model/business';

@Component({
  selector: 'app-business-view',
  templateUrl: './business-view.component.html',
  styleUrls: ['./business-view.component.css']
})
export class BusinessViewComponent implements OnInit {
  businessId: string;
  private businessDoc: AngularFirestoreDocument<Business>;
  business: Observable<Business>;

  constructor(private afs: AngularFirestore,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.businessId = this.route.snapshot.paramMap.get('id');
    this.businessDoc = this.afs.doc<Business>(`businesses/${this.businessId}`);
    this.business = this.businessDoc.valueChanges();
  }

}
