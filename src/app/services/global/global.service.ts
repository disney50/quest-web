import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { Explorer } from 'src/app/models/explorer';
import { Planet } from 'src/app/models/planet';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  signedInUser: User = {} as User;
  currentExplorer: Explorer = {} as Explorer;
  currentPlanet: Planet = {} as Planet;

  constructor() { }

  setSignedInUser(signedInUser: User): void {
    this.signedInUser = signedInUser;
  }

  removeSignedInUser() {
    this.signedInUser = {} as User;
  }

  setCurrentExplorer(currentExplorer: Explorer) {
    this.currentExplorer = currentExplorer;
  }

  removeCurrentExplorer() {
    this.currentExplorer = {} as Explorer;
  }

  setCurrentPlanet(currentPlanet: Planet) {
    this.currentPlanet = currentPlanet;
  }

  removeCurrentPlanet() {
    this.currentPlanet = {} as Planet;
  }
}
