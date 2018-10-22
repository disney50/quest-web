import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {}
  
  googleSignIn() {
    return this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  googleLogOut() {
    this.auth.auth.signOut();
  }
}
