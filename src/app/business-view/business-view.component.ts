import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
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

  businessFormGroup: FormGroup;
  extraFormGroup: FormGroup;
  whyFormGroup: FormGroup;
  isLoading: boolean;

  constructor(private afs: AngularFirestore,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    this.businessId = this.route.snapshot.paramMap.get('id');
    this.businessDoc = this.afs.doc<Business>(`businesses/${this.businessId}`);
    this.business = this.businessDoc.valueChanges();
  }
}
