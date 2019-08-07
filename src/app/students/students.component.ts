import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  isLoading = true;
  students: Observable<Student[]>;

  constructor(private firestore: FirestoreService<Student>) { }

  ngOnInit() {
    this.firestore.setCollection('students');
    this.students = this.firestore.list();
    this.students.subscribe(e => {
      this.isLoading = false;
    });
  }

}
