import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-business-view',
  templateUrl: './business-view.component.html',
  styleUrls: ['./business-view.component.css']
})
export class BusinessViewComponent implements OnInit {
  businessId: string;
  private businessDoc: AngularFirestoreDocument<any>;
  business: Observable<any>;

  constructor(private afs: AngularFirestore,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.businessId = this.route.snapshot.paramMap.get('id');
    this.businessDoc = this.afs.doc<any>(`businesses/${this.businessId}`);
    this.business = this.businessDoc.valueChanges();
  }

}
