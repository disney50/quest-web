import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User, UserData } from 'src/app/models/user';
import { map } from 'rxjs/operators';
import { GlobalService } from '../global/global.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  users$: Observable<any>;
  userCollection: AngularFirestoreCollection<User>;

  constructor(private angularFirestore: AngularFirestore, 
    private globalService: GlobalService, 
    private store: Store<AppState>) {
    this.userCollection = angularFirestore.collection<User>("users");

    this.users$ = angularFirestore.collection("users").snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => new User(action.payload.doc.id, action.payload.doc.data() as UserData));
      })
    )
  }

  createNewUserId(): string {
    const newUserId = this.angularFirestore.createId();
    return newUserId;
  }

  registerNewUser(newUser: User) {
    this.userCollection.doc(newUser.userId).set(newUser);

    this.globalService.setSignedInUser(newUser);

    this.signInNewUser();
  }

  signInNewUser() {
    this.store.dispatch(new actions.RequestGetNewUser);

    this.store.select("user").subscribe(userState => {
      this.globalService.setSignedInUser(userState.signedInUser);
    });
  }
}
