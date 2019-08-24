import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Business } from '../model/business';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.isLoading = true;
    this.businessId = this.route.snapshot.paramMap.get('id');
    this.businessDoc = this.afs.doc<Business>(`businesses/${this.businessId}`);
    this.business = this.businessDoc.valueChanges();
    this.business.subscribe(r => {
      this.businessFormGroup = this.formBuilder.group({
        abn: [r.abn],
        name: [r.name, Validators.required],
        supervisor: [r.supervisor],
        address: [r.address],
        fteNumber: [r.fteNumber],
        additionalEmployees: [r.additionalEmployees],
        isMentorAvailable: [r.isMentorAvailable],
        mentor: [r.mentor],
      });
      this.extraFormGroup = this.formBuilder.group({
        website: [r.website],
        industry: [r.industry],
        description: [r.description],
        startDate: [r.startDate ? new Date(r.startDate.seconds * 1000) : null],
        endDate: [r.startDate ? new Date(r.endDate.seconds * 1000) : null],
        supervisorRole: [r.supervisorRole],
        supervisorExperience: [r.supervisorExperience],
      });
      this.whyFormGroup = this.formBuilder.group({
        completeProject: [r.why.completeProject],
        testStudent: [r.why.testStudent],
        gainIdeas: [r.why.gainIdeas],
        developMentors: [r.why.developMentors],
        other: [r.why.other],
      });

      this.isLoading = false;

    });

  }

}
