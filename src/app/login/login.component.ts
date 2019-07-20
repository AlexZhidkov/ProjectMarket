import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faculties: string[];
  faculty: string;
  userPrimaryRole: string;
  showUserPrimaryRoleSelector: boolean;
  studentUniversity: string;

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userPrimaryRole = localStorage.getItem('userPrimaryRole');
    this.studentUniversity = localStorage.getItem('university');
    this.faculty = localStorage.getItem('faculty');
    this.showUserPrimaryRoleSelector = !Boolean(this.userPrimaryRole);
  }

  updateUserPrimaryRole(role: string) {
    localStorage.setItem('userPrimaryRole', role);
  }

  login(provider: string) {
    localStorage.setItem('university', this.studentUniversity);
    localStorage.setItem('userPrimaryRole', this.userPrimaryRole);
    localStorage.setItem('faculty', this.faculty);

    switch (provider) {
      case 'facebook': {
        this.authService.googleLogin()
          .then(() => this.redirectAfterLogin());
        break;
      }
      case 'google': {
        this.authService.googleLogin()
          .then(() => this.redirectAfterLogin());
        break;
      }
    }
  }

  redirectAfterLogin() {
    const authReturnUrl = localStorage.getItem('authReturnUrl');
    localStorage.removeItem('authReturnUrl');
    const redirectAfterLoginPath = authReturnUrl ? authReturnUrl : '/';
    this.router.navigate([redirectAfterLoginPath]);
  }
}
