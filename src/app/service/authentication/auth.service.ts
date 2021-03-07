import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  authState: any = null;
  newUser: any;

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore,) {

  }

  getUserState() {
    return this.afAuth.authState;
  }

  login( email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          this.router.navigate(['/table'])
        }
      })
  }

  //register service call
  createUser(user) {
    this.afAuth.createUserWithEmailAndPassword( user.email, user.password)
      .then( userCredential => {
        this.newUser = user;
        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/table']);
          });
      })
      .catch( error => {
        this.eventAuthError.next(error);
      });
  }

  //insert data
  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      password: this.newUser.password,
      fullName: this.newUser.fullName,
      qualification: this.newUser.qualification,
      university: this.newUser.university,
      message: 'inserted'
    })
  }

  //signout function
  singout(): void
  {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}
