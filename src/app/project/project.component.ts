import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NamedEntity } from '../model/named-entity';
import { Project } from '../model/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectId: string;
  projectDoc: AngularFirestoreDocument<Project>;
  project: Observable<Project>;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
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

  assignBusiness(id: string) {
    this.afs.collection('businesses').doc(id).get().subscribe(businessSnapshot => {
      const business = businessSnapshot.data();
      const assignedBusiness: NamedEntity = {
        id,
        name: business.name
      };
      this.projectDoc.update({ business: assignedBusiness });
    });
  }

  assignStudent(id: string) {
    this.afs.collection('students').doc(id).get().subscribe(studentSnapshot => {
      const student = studentSnapshot.data();
      const assignedStudent: NamedEntity = {
        id,
        name: student.name
      };
      this.projectDoc.update({ student: assignedStudent });
    });
  }

  deleteProject() {
    this.afs.doc<any>(`projects/${this.projectId}`).delete();
    // ToDo navigate away from this page
  }
}
