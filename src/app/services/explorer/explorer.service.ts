import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Explorer } from 'src/app/models/explorer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as selectors from '../../store/selectors';
import { User } from 'src/app/models/user';
import { Planet } from 'src/app/models/planet';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  newExplorer: Explorer = {} as Explorer;

  constructor(private angularFirestore: AngularFirestore) { 

  }

  createNewExplorer(selectedPlanet: Planet, newUser: User) {      
    this.newExplorer.name = newUser.name;
    this.newExplorer.surname = newUser.surname;
    this.newExplorer.xp = "0";
    this.newExplorer.userId = newUser.userId;

    this.addNewExplorerToPlanet(selectedPlanet);
  }

  addNewExplorerToPlanet(selectedPlanet: Planet) {      
    this.angularFirestore.collection(selectedPlanet.name + "/explorers/entries").doc(this.newExplorer.userId).set(this.newExplorer);
  }
}
