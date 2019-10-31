import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  isLoading = true;
  projects: Observable<Project[]>;

  constructor(
    private firestore: FirestoreService<Project>,
    private outlet: RouterOutlet,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.outlet.activatedRouteData.isReferrer) {
      this.firestore.setCollection('projects', ref => ref
        .where('referrer.uid', '==', this.authService.currentUser().uid)
      );
    } else {
      this.firestore.setCollection('projects');
    }
    this.projects = this.firestore.list();
    this.projects.subscribe(() => {
      this.isLoading = false;
    });
  }
}
