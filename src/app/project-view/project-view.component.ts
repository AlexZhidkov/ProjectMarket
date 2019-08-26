import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../model/project';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {
  projectId: string;
  projectDoc: AngularFirestoreDocument<Project>;
  project: Observable<Project>;

  constructor(private afs: AngularFirestore,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.projectDoc = this.afs.doc<any>(`projects/${this.projectId}`);
    this.project = this.projectDoc.valueChanges();
  }
}
