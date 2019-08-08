import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../model/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectId: string;
  private projectDoc: AngularFirestoreDocument<Project>;
  project: Observable<Project>;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.projectDoc = this.afs.doc<any>(`projects/${this.projectId}`);
    } else {
      this.projectId = this.afs.createId();
      this.projectDoc = this.afs.collection('projects').doc(this.projectId);
      this.projectDoc.set({
        name: null,
        business: null,
        student: null,
        createdOn: new Date(),
        createdBy: {
          uid: localStorage.getItem('uid'),
          name: localStorage.getItem('userName')
        }
      });
    }
    this.project = this.projectDoc.valueChanges();
  }
}
