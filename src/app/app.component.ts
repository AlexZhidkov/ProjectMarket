import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserProfile } from './model/user-profile';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

  logout() {
    this.authService.signOut();
  }
}
