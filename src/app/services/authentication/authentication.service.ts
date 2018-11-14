import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private store: Store<AppState>,
    private angularFirestore: AngularFirestore) {}

  getEnteredEmailAndPassword(email: string, password: string) {
  }

  authenticateUser(email: string, password: string) {
    return this.angularFirestore
    .collection('users', ref => ref.where('email', "==", email).where('password', '==', password))
    .stateChanges().subscribe(res => {
        if (res.length > 0) {
        }
        else {
        }
    });
  }

  signInExistingUser() {
   //   this.store.dispatch(new actions.RequestGetExistingUser);

      this.store.select("user").subscribe(userState => {
      });

      return this.store.select("user");
  }
}
