import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.isLoggedIn().pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          localStorage.setItem('authReturnUrl', state.url);
          localStorage.setItem('userPrimaryRole', next.data.role);
          this.router.navigate(['/login']);
        }
      }));
  }

}
