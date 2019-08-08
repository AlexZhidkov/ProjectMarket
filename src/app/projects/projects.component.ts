import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  isLoading = true;
  projects: Observable<Project[]>;

  constructor(private firestore: FirestoreService<Project>) { }

  ngOnInit() {
    this.firestore.setCollection('projects');
    this.projects = this.firestore.list();
    this.projects.subscribe(() => {
      this.isLoading = false;
    });
  }
}
