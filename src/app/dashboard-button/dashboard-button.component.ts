import { Component, OnInit, Input } from '@angular/core';

export interface DashboardButton {
  label: string;
  routerLink: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard-button',
  templateUrl: './dashboard-button.component.html',
  styleUrls: ['./dashboard-button.component.scss']
})
export class DashboardButtonComponent implements OnInit {

  @Input() spec: DashboardButton;

  constructor() { }

  ngOnInit() {
  }

}
