import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserProfile } from './model/user-profile';
import { AuthService } from './services/auth.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { APP_DATE_FORMATS, AppDateAdapter } from './shared/format-datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})

export class AppComponent {
  title: string;
  homeUrl: string;
  user: UserProfile;
  photoURL: string;

  constructor(private authService: AuthService,
              private titleService: Title) {
    this.title = environment.title;
    this.titleService.setTitle(this.title);
    this.homeUrl = environment.homeUrl;
    authService.user.pipe(map(user => {
      this.user = user;
    }))
      .subscribe();
  }

  navigateHome() {
    window.location.href = this.homeUrl;
  }

  logout() {
    this.authService.signOut();
  }
}
