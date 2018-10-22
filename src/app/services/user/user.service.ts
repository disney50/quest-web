import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  signedInUser: AngularFirestoreCollection<User>;
  user: User;
  user$ = new ReplaySubject<User>();

  constructor(private db: AngularFirestore) { }

  getUserByFirebaseUserId(firebaseUserId: string) {
    this.signedInUser = this.db.collection('users/', ref => ref.where('firebaseUserId', '==', firebaseUserId));
    this.signedInUser.stateChanges().forEach(users => {
      users.forEach(user => {
        this.user = user.payload.doc.data() as User;
        this.user.userId = user.payload.doc.id;
        this.user$.next(this.user);
      });
    });
  }
}
