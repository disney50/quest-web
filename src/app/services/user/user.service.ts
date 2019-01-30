import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFirestore: AngularFirestore) {

  }
  checksUserExists(email: string): Observable<boolean> {
    return this.angularFirestore.collection('users', ref => ref.where('email', '==', email))
      .get()
      .pipe(
        map(doc => {
          return doc.docs.length !== 0 ? true : false;
        })
      );
  }

  registerNewUser(newUser: User) {
    newUser.userId = this.angularFirestore.createId();
    this.angularFirestore.collection('users').doc(newUser.userId).set(newUser);
  }
}
