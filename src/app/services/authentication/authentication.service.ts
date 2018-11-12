import { Injectable } from '@angular/core';
import * as actions from '../../store/actions';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { GlobalService } from '../global/global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private store: Store<AppState>,
    private globalService: GlobalService,
    private angularFirestore: AngularFirestore) {}

  getEnteredEmailAndPassword(email: string, password: string) {
    console.log("2.getEnteredEmailAndPassword()");

      this.globalService.setEmail(email);
      this.globalService.setPassword(password);
  }

  authenticateUser(email: string, password: string) {
    console.log("3.authenticateUser()");

    return this.angularFirestore
    .collection('users', ref => ref.where('email', "==", email).where('password', '==', password))
    .stateChanges().subscribe(res => {
        if (res.length > 0) {
          this.globalService.userExists = true;
        }
        else {
          this.globalService.userExists = false;
        }
    });
  }

  signInExistingUser() {
    console.log("5.signInExistingUser()");

   //   this.store.dispatch(new actions.RequestGetExistingUser);

      this.store.select("user").subscribe(userState => {
        console.log("5.1.userState.signedInUser: ", userState.signedInUser);

        this.globalService.setSignedInUser(userState.signedInUser);
        console.log("5.2.this.globalService.signedInUser: ", this.globalService.signedInUser);
      });

      return this.store.select("user");
  }

  logOutUser() {
    this.store.dispatch(new actions.LogOutUser);
  }
}
