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

  email: string;
  password: string;

  constructor() { }

  setEmailAndPassword(user: User) {
    this.email = user.email;
    this.password = user.password;
  }

  setSignedInUser(signedInUser: User): void {
    this.signedInUser = signedInUser;
  }

  setCurrentExplorer(currentExplorer: Explorer) {
    this.currentExplorer = currentExplorer;
  }

  setCurrentPlanet(currentPlanet: Planet) {
    this.currentPlanet = currentPlanet;
  }
}
