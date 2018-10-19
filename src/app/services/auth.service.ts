import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;

  constructor(private auth: AngularFireAuth) {}
  
  googleSignIn() {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //   this.user = result.user;
    // }).catch(function(error) {
    // });
    return this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  googleLogOut() {
    // firebase.auth().signOut().then(function() {
    // }).catch(function(error) {
    // });
    this.auth.auth.signOut();
  }
}
