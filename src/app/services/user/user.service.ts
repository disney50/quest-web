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
  checksUserExistsUsers(email: string): Observable<boolean> {
    return this.angularFirestore.collection('users', ref => ref.where('email', '==', email))
      .get()
      .pipe(
        map(doc => {
          console.log(doc.docs[0]);

          return doc.docs.length !== 0 ? true : false;
        })
      );
  }

  checksUserExistsExplorers(email: string): Observable<boolean> {
    return this.angularFirestore.collection('codeez/explorers/entries/', ref => ref.where('email', '==', email))
      .get()
      .pipe(
        map(doc => {
          console.log(doc.docs[0]);

          return doc.docs.length !== 0 ? true : false;
        })
      );
  }

  registerNewUser(newUser: User) {
    newUser.userId = this.angularFirestore.createId();
    this.angularFirestore.collection('users').doc(newUser.userId).set(newUser);
  }
}
