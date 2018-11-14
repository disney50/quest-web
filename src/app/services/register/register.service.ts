import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  users$: Observable<any>;
  userCollection: AngularFirestoreCollection<User>;

  constructor(private angularFirestore: AngularFirestore) {
  }

  createNewUserId(): string {
    const newUserId = this.angularFirestore.createId();
    return newUserId;
  }

  registerNewUser(newUser: User) {
    this.angularFirestore.collection("users").doc(newUser.userId).set(newUser);
  }
}
