import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private angularFirestore: AngularFirestore) { }

  getSignedInUserPlanets() {

  }
}
