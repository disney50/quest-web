import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Planet } from 'src/app/models/planet';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as selectors from '../../store/selectors';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  selectedPlanet: Planet =  {} as Planet;

  constructor(private angularFirestore: AngularFirestore, 
    private store: Store<AppState>) {

  }

  addPlanetToUser(selectedPlanet: Planet) {
    this.selectedPlanet.name = selectedPlanet.name;
    this.selectedPlanet.description = selectedPlanet.description;

    this.store.select(selectors.signedInUser).subscribe(signedInUser => {
      this.angularFirestore.collection("users/" + signedInUser.userId + "/planets").doc(selectedPlanet.name).set(this.selectedPlanet);
    });
  }
}