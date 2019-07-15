import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserProfile } from '../model/user-profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<UserProfile> = new BehaviorSubject(null);

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {

    this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          /// signed in
          return this.afs.doc('users/' + user.uid).valueChanges();
        } else {
          /// not signed in
          return of(null);
        }
      }))
      .subscribe(user => {
        this.user.next(user);
      });
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('email');
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        debugger;
        this.updateUser(credential.user);
      });
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  private updateUser(authData) {
    const userDoc = this.afs.doc<UserProfile>('users/' + authData.uid).set({
      displayName: authData.displayName,
      email: authData.email,
      photoURL: authData.photoURL,
    }, { merge: true });
  }
}
