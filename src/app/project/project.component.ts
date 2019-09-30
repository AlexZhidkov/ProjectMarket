import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppEvent } from '../model/app-event';
import { Project } from '../model/project';
import { UserShort } from '../model/user-short';

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
        description: null,
        status: 'New project',
        business: null,
        student: null,
        events: [],
        isStudentAccepted: false,
        isBusinessAccepted: false,
        isDocumentationCompleted: false,
        isProjectStarted: false,
        isProjectFinished: false,
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
      const assignedBusiness: UserShort = {
        uid: id,
        name: business.name
      };
      this.projectDoc.update({ business: assignedBusiness });
      if (business.referrer) {
        this.projectDoc.update({ referrer: business.referrer });
      }
    });
  }

  assignStudent(id: string) {
    this.afs.collection('students').doc(id).get().subscribe(studentSnapshot => {
      const student = studentSnapshot.data();
      const assignedStudent: UserShort = {
        uid: id,
        name: student.name
      };
      this.projectDoc.update({ student: assignedStudent });
    });
  }

  addEvent(projectEvent: string) {
    this.projectDoc.get()
      .subscribe(projectSnapshot => {
        const project = projectSnapshot.data() as Project;
        project.events.push({
          title: projectEvent,
          createdOn: new Date()
        });

        this.projectDoc.update({ events: project.events });

        const event: AppEvent = {
          createdOn: new Date(),
          title: projectEvent,
          data: null,
          user: {
            uid: localStorage.getItem('uid'),
            name: localStorage.getItem('userName')
          },
          business: project.business,
          student: project.student,
          referrer: project.referrer
        };

        this.afs.collection('events').add(event);
      });
  }

  deleteProject() {
    this.afs.doc<any>(`projects/${this.projectId}`).delete();
    this.router.navigateByUrl('/admin/projects');
  }
}
