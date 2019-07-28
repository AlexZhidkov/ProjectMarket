import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  studentId: string;
  private studentDoc: AngularFirestoreDocument<any>;
  student: Observable<any>;

  constructor(private afs: AngularFirestore,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id');
    this.studentDoc = this.afs.doc<any>(`students/${this.studentId}`);
    this.student = this.studentDoc.valueChanges();
  }

}
