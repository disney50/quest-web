import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Explorer } from 'src/app/models/explorer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as selectors from '../../store/selectors';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  newExplorer: Explorer = {} as Explorer;

  constructor(private angularFirestore: AngularFirestore, 
    private store: Store<AppState>) { 

  }

  createNewExplorer() {
    this.store.select(selectors.signedInUser).subscribe(signedInUser => {
      this.newExplorer.name = signedInUser.name;
      this.newExplorer.surname = signedInUser.surname;
      this.newExplorer.xp = "0";
      this.newExplorer.userId = signedInUser.userId;
    });

    this.addNewExplorerToPlanet();
  }

  addNewExplorerToPlanet() {
    this.store.select(selectors.currentPlanet).subscribe(currentPlanet => {
      this.angularFirestore.collection(currentPlanet.name + "/explorers/entries").doc(this.newExplorer.userId).set(this.newExplorer);
    });
  }
}
