import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AppEvent } from '../model/app-event';
import { Business } from '../model/business';

@Component({
  selector: 'app-business-onboard',
  templateUrl: './business-onboard.component.html',
  styleUrls: ['./business-onboard.component.css']
})
export class BusinessOnboardComponent implements OnInit {
  isLoading = true;
  template: string;
  businessId: string;
  isReferrer: boolean;
  userRole: string;
  businessDoc: AngularFirestoreDocument<Business>;
  business: Observable<Business>;
  businessFormGroup: FormGroup;
  extraFormGroup: FormGroup;
  whyFormGroup: FormGroup;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private outlet: RouterOutlet,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    this.template = this.route.snapshot.paramMap.get('template');
    this.businessId = this.route.snapshot.paramMap.get('id');
    // tslint:disable-next-line:no-string-literal
    this.isReferrer = this.outlet.activatedRouteData['isReferrer'];
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
    if (this.template) {
      this.businessDoc.update({ template: this.template });
    }
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

  deleteBusiness() {
    this.businessDoc.delete();
    this.router.navigateByUrl('/admin/businesses');
  }

  submit() {
    this.businessDoc.update({ isSubmitted: true, submittedOn: new Date() }).then(() => {
      this.businessDoc.get()
        .subscribe(businessSnapshot => {
          const business = businessSnapshot.data() as Business;
          business.id = businessSnapshot.id;
          const event: AppEvent = {
            createdOn: new Date(),
            title: 'Business submitted form',
            data: business,
            user: {
              uid: localStorage.getItem('uid'),
              name: localStorage.getItem('userName')
            },
            business: {
              uid: business.id,
              name: business.name
            }
          };
          if (this.isReferrer) {
            event.referrer = {
              uid: localStorage.getItem('uid'),
              name: localStorage.getItem('userName')
            };
          }
          this.afs.collection('events').add(event);
        });
    });

    if (this.isReferrer) {
      this.router.navigateByUrl('/referrer');
    } else {
      this.router.navigateByUrl('/business');
    }
  }
}
