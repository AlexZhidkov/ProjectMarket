import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppEvent } from '../model/app-event';
import { UserProfile } from '../model/user-profile';

@Component({
  selector: 'app-student-onboard',
  templateUrl: './student-onboard.component.html',
  styleUrls: ['./student-onboard.component.css']
})
export class StudentOnboardComponent implements OnInit {
  isLoading = true;
  uid: string;
  template: string;
  userDoc: AngularFirestoreDocument<UserProfile>;
  user: Observable<UserProfile>;
  personalFormGroup: FormGroup;
  studyFormGroup: FormGroup;
  resumeFormGroup: FormGroup;
  universities: string[];
  filteredUniversities: Observable<string[]>;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.template = this.route.snapshot.paramMap.get('template');
    this.uid = localStorage.getItem('uid');
    this.userDoc = this.afs.doc<UserProfile>('users/' + this.uid);
    this.bindFormControls();
  }

  submit() {
    this.userDoc.update({ formSubmittedOn: new Date() });

    this.userDoc.get()
      .subscribe(studentSnapshot => {
        const student = studentSnapshot.data() as UserProfile;
        student.id = studentSnapshot.id;
        const event: AppEvent = {
          createdOn: new Date(),
          title: 'Student submitted form',
          data: student,
          user: {
            uid: localStorage.getItem('uid'),
            name: localStorage.getItem('userName')
          },
          student: {
            uid: student.id,
            name: student.name
          }
        };

        this.afs.collection('events').add(event);
        this.afs.collection('students').doc(student.id).set(student);
      });
  }

  bindFormControls() {
    this.user = this.userDoc.valueChanges();
    this.user.subscribe(r => {
      if (!r) { return; }
      if (!r.student) {
        r.student = {
          template: this.template,
          studyArea: null,
          isStudying: false,
          university: null,
          year: null,
          course: null,
          interests: null,
          why: null,
          resumeUrl: null,
          transcriptUrl: null
        };
      }
      this.userDoc.set(r, { merge: true });
      this.personalFormGroup = this.formBuilder.group({
        nameCtrl: [r.name, Validators.required],
        emailCtrl: [r.email, Validators.required],
        studyAreaCtrl: [r.student.studyArea]
      });
      this.studyFormGroup = this.formBuilder.group({
        isStudyingCtrl: [r.student.isStudying],
        universityCtrl: [r.student.university],
        yearCtrl: [r.student.year],
        courseCtrl: [r.student.course]
      });
      this.resumeFormGroup = this.formBuilder.group({
        interestsCtrl: [r.student.interests],
        whyCtrl: [r.student.why],
        resumeUrlCtrl: [r.student.resumeUrl],
        transcriptUrlCtrl: [r.student.transcriptUrl]
      });
      this.buildUniversityControl();
      this.isLoading = false;
    });
  }

  buildUniversityControl() {
    this.universities = [
      'Curtin University',
      'Edith Cowan University',
      'Murdoch University',
      'University of Notre Dame Australia',
      'University of Western Australia',
      'Australian Catholic University',
      'Australian Catholic University',
      'Australian National University',
      'Bond University',
      'Charles Darwin University',
      'Charles Sturt University',
      'CQUniversity',
      'Curtin University',
      'Deakin University',
      'Edith Cowan University',
      'Federation University Australia',
      'Flinders University',
      'Griffith University',
      'James Cook University',
      'La Trobe University',
      'Macquarie University',
      'Monash University',
      'Murdoch University',
      'Queensland University of Technology',
      'RMIT University',
      'Southern Cross University',
      'Swinburne University of Technology',
      'Torrens University Australia',
      'University of Adelaide',
      'University of Canberra',
      'University of Divinity',
      'University of Melbourne',
      'University of New England',
      'University of New South Wales',
      'University of Newcastle',
      'University of Notre Dame Australia',
      'University of Queensland',
      'University of South Australia',
      'University of Southern Queensland',
      'University of Sydney',
      'University of Tasmania',
      'University of Technology Sydney',
      'University of the Sunshine Coast',
      'University of Western Australia',
      'University of Wollongong',
      'Victoria University',
      'Western Sydney University',
    ];

    this.filteredUniversities = this.studyFormGroup.get('universityCtrl').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.universities.filter(option => option.toLowerCase().includes(filterValue));
  }
}
