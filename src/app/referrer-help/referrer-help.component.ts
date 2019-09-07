import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-referrer-help',
  templateUrl: './referrer-help.component.html',
  styleUrls: ['./referrer-help.component.css']
})
export class ReferrerHelpComponent implements OnInit {
  @Output() closeButtonClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
