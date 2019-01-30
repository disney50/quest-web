import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Planet } from 'src/app/models/planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  selectedPlanet: Planet =  {} as Planet;

  constructor(private angularFirestore: AngularFirestore) {

  }

  createPlanet(userId: string, selectedPlanet: Planet) {
    this.selectedPlanet.name = selectedPlanet.name;
    this.selectedPlanet.description = selectedPlanet.description;
    this.addPlanetToUser(userId);
  }

  addPlanetToUser(userId: string) {
    this.angularFirestore.collection('users/' + userId + '/planets').doc(this.selectedPlanet.name).set(this.selectedPlanet);
  }
}
