import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFirestore: AngularFirestore) {

  }

  registerNewUser(newUser: User) {  
    newUser.userId = this.angularFirestore.createId();

    this.angularFirestore.collection("users").doc(newUser.userId).set(newUser);
  }
}
