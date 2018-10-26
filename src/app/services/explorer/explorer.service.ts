import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { Explorer } from 'src/app/models/explorer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  explorers$: Observable<any>;
  explorerCollecton: AngularFirestoreCollection<Explorer>;

  newExplorer: Explorer = {} as Explorer;

  constructor(private angularFirestore: AngularFirestore) {}

  createNewExplorer(newUser: User) {
    this.newExplorer.name = newUser.name;
    this.newExplorer.surname = newUser.surname;
    this.newExplorer.xp = "0";
    this.angularFirestore.doc(newUser.userId).set(this.newExplorer);    
    this.newExplorer = {} as Explorer;
  }
}
