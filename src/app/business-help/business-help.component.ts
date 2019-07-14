import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-business-help',
  templateUrl: './business-help.component.html',
  styleUrls: ['./business-help.component.css']
})
export class BusinessHelpComponent implements OnInit {
  @Output() closeButtonClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
