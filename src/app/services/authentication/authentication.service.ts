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
      this.globalService.setEmail(email);
      this.globalService.setPassword(password);
  }

  authenticateUser(email: string, password: string) {
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
   //   this.store.dispatch(new actions.RequestGetExistingUser);

      this.store.select("user").subscribe(userState => {
        this.globalService.setSignedInUser(userState.signedInUser);
      });

      return this.store.select("user");
  }

  logOutUser() {
    this.store.dispatch(new actions.LogOutUser);
  }
}
