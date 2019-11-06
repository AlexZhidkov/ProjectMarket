import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.isLoggedIn().pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          localStorage.setItem('authReturnUrl', state.url);
          localStorage.setItem('newUserRole', next.data.newUserRole);
          this.router.navigate(['/login']);
        }
      }));
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user.pipe(
      take(1),
      map(user => {
        let authRoles = [];

        if (route.parent.data.authRoles) {
          authRoles = route.parent.data.authRoles;
        }
        if (route.data.authRoles) {
          authRoles = route.data.authRoles;
        }

        if (!authRoles || authRoles.length === 0) {
          return true;
        }

        if (authRoles.includes(user.role) || authRoles.includes('all')) {
          return true;
        }

        this.snackBar.open('Access denied. You are not authorized to access this page.', null, {
          duration: 5000
        });

        return false;

      }),
      tap(isAble => {
        if (!isAble) {
          this.router.navigate(['/']);
        }
      })
    );

  }

}
