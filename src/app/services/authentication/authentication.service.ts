import { Injectable } from '@angular/core';
import * as actions from '../../store/actions';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { GlobalService } from '../global/global.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private store: Store<AppState>, 
    private globalService: GlobalService,
    private angularFirestore: AngularFirestore,
    private router: Router) {}

  getEnteredEmailAndPassword(email: string, password: string) {
      this.globalService.setEmail(email);
      this.globalService.setPassword(password);
  }  

  authenticateUser(email: string, password: string): Observable<DocumentChangeAction<{}>[]> {     
    return this.angularFirestore
    .collection('users', ref => ref.where('email', "==", email).where('password', '==', password))
    .stateChanges();
  }

  signInExistingUser() {
    console.log("signInExistingUser()");

      this.store.dispatch(new actions.RequestGetExistingUser);

      this.store.select("user").subscribe(userState => {
        console.log("userState.signedInUser", userState.signedInUser);

        this.globalService.setSignedInUser(userState.signedInUser);
        console.log("this.globalService.signedInUser", this.globalService.signedInUser);
      });    
  }

  logOutUser() {
    this.store.dispatch(new actions.LogOutUser);
  }
}
