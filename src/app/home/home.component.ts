import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  student() {
    this.router.navigate(['/student/']);
  }

  business() {
    this.router.navigate(['/business/']);
  }

  university() {
    this.router.navigate(['/university/']);
  }

  referrer() {
    this.router.navigate(['/referrer/']);
  }

  admin() {
    this.router.navigate(['/admin/']);
  }
}
