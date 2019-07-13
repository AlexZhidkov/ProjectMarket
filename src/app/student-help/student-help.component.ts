import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-student-help',
  templateUrl: './student-help.component.html',
  styleUrls: ['./student-help.component.css']
})
export class StudentHelpComponent implements OnInit {
  @Output() closeButtonClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
