import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Explorer } from 'src/app/models/explorer';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  newExplorer: Explorer = {} as Explorer;

  constructor(private angularFirestore: AngularFirestore) { 

  }

  createExplorer(planetName: string, newUser: User) {      
    this.newExplorer.name = newUser.name;
    this.newExplorer.surname = newUser.surname;
    this.newExplorer.xp = "0";
    this.newExplorer.userId = newUser.userId;
    this.addNewExplorerToPlanet(planetName);
  }

  addNewExplorerToPlanet(planetName: string) {      
    this.angularFirestore.collection(planetName + "/explorers/entries").doc(this.newExplorer.userId).set(this.newExplorer);
  }
}
