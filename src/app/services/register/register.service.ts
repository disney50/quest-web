import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  users$: Observable<any>;
  userCollection: AngularFirestoreCollection<User>;

  constructor(private angularFirestore: AngularFirestore,
    private globalService: GlobalService) {
  }

  createNewUserId(): string {
    const newUserId = this.angularFirestore.createId();
    return newUserId;
  }

  registerNewUser(newUser: User) {
    this.angularFirestore.collection("users").doc(newUser.userId).set(newUser);

    this.globalService.setSignedInUser(newUser);
  }
}
