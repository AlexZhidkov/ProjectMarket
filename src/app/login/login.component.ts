import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInProvider } from '../model/signInProviders';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userPrimaryRole: string;
  provider = SignInProvider;

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit() { }

  login(provider: SignInProvider) {
    this.authService.login(provider)
      .then(() => this.redirectAfterLogin());
  }

  redirectAfterLogin() {
    const authReturnUrl = localStorage.getItem('authReturnUrl');
    localStorage.removeItem('authReturnUrl');
    const redirectAfterLoginPath = authReturnUrl ? authReturnUrl : '/';
    this.router.navigate([redirectAfterLoginPath]);
  }
}
