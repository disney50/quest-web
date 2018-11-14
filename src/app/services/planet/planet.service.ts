import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Planet } from 'src/app/models/planet';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  selectedPlanet: Planet =  {} as Planet;

  constructor(private angularFirestore: AngularFirestore,
    private globalService: GlobalService) {
  }

  addSelectedPlanet(selectedPlanet: Planet) {
    this.selectedPlanet.name = selectedPlanet.name;
    this.selectedPlanet.description = selectedPlanet.description;
    
    this.angularFirestore.collection("users/" + this.globalService.signedInUser.userId + "/planets").doc(selectedPlanet.name).set(this.selectedPlanet);
  }
}