import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SignInProvider } from '../model/signInProviders';
import { UserProfile } from '../model/user-profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<UserProfile>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {

    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          /// signed in
          localStorage.setItem('uid', user.uid);
          localStorage.setItem('userName', user.displayName);
          return this.afs.doc('users/' + user.uid).valueChanges();
        } else {
          /// not signed in
          localStorage.removeItem('uid');
          return of(null);
        }
      }));
  }

  currentUser() {
    return this.afAuth.auth.currentUser;
  }

  login(providerName: SignInProvider) {
    let provider: any;
    switch (providerName) {
      case SignInProvider.google:
        provider = new auth.GoogleAuthProvider();
        provider.addScope('email');
        break;
      case SignInProvider.facebook:
        provider = new auth.FacebookAuthProvider();
        provider.addScope('email');
        break;
      case SignInProvider.microsoft:
        provider = new auth.OAuthProvider('microsoft.com');
        break;
    }
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        this.updateUser(credential.user);
      });
  }

  isLoggedIn(): Observable<boolean> {
    return this.user.pipe(
      map(user => !!user)
    );
  }

  signOut() {
    localStorage.removeItem('uid');
    this.afAuth.auth.signOut();
  }

  private updateUser(authData) {
    const user: UserProfile = {
      name: authData.displayName,
      authName: authData.displayName,
      email: authData.email,
      authEmail: authData.email,
      photoURL: authData.photoURL,
      roles: {}
    };
    switch (localStorage.getItem('userPrimaryRole')) {
      case 'Student':
        user.roles.isStudent = true;
        break;
    }
    const userDoc = this.afs.doc<UserProfile>('users/' + authData.uid).set(user, { merge: true });
  }
}
