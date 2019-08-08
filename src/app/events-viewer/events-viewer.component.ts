import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppEvent } from '../model/app-event';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-events-viewer',
  templateUrl: './events-viewer.component.html',
  styleUrls: ['./events-viewer.component.css']
})
export class EventsViewerComponent implements OnInit {
  isLoading = true;
  events: Observable<AppEvent[]>;

  constructor(private firestore: FirestoreService<AppEvent>) { }

  ngOnInit() {
    this.firestore.setCollection('events', ref => ref.orderBy('createdOn', 'desc').limit(100));
    this.events = this.firestore.list();
    this.events.subscribe(e => {
      this.isLoading = false;
    });
  }
}
