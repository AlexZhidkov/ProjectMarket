import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-users-viewer',
  templateUrl: './users-viewer.component.html',
  styleUrls: ['./users-viewer.component.css']
})
export class UsersViewerComponent implements OnInit {
  isLoading = true;
  users: Observable<any[]>;

  constructor(private firestore: FirestoreService<any>) { }

  ngOnInit() {
    this.firestore.setCollection('users');
    this.users = this.firestore.list();
    this.users.subscribe(e => {
      this.isLoading = false;
    });
  }
}
