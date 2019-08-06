import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppEvent } from '../model/app-event';

@Component({
  selector: 'app-business-onboard',
  templateUrl: './business-onboard.component.html',
  styleUrls: ['./business-onboard.component.css']
})
export class BusinessOnboardComponent implements OnInit {
  isLoading = true;
  businessId: string;
  businessDoc: AngularFirestoreDocument<any>;
  business: Observable<any>;
  businessFormGroup: FormGroup;
  extraFormGroup: FormGroup;
  whyFormGroup: FormGroup;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.businessId = this.route.snapshot.paramMap.get('id');
    if (this.businessId) {
      this.bindFormControls();
    } else {
      this.businessId = this.afs.createId();
      this.afs.collection('businesses').doc(this.businessId).set({
        why: {},
        createdBy: {
          uid: localStorage.getItem('uid'),
          name: localStorage.getItem('userName')
        },
        isSubmitted: false,
        submittedOn: null
      }).then(_ => this.bindFormControls());
    }
  }

  bindFormControls() {
    this.businessDoc = this.afs.collection('businesses').doc(this.businessId);
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

  submit() {
    this.businessDoc.update({ isSubmitted: true, submittedOn: new Date() }).then(() => {
      this.businessDoc.get()
        .subscribe(businessSnapshot => {
          const business = businessSnapshot.data();
          business.id = businessSnapshot.id;
          const event: AppEvent = {
            created: new Date(),
            title: 'Business submitted form',
            data: business,
            user: {
              uid: localStorage.getItem('uid'),
              name: localStorage.getItem('userName')
            }
          };

          this.afs.collection('events').add(event);
        });
    });
    this.router.navigateByUrl('/referrer');

  }
}
