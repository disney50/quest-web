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

  userEmail: string;
  userPassword: string;
  userExists: boolean;

  constructor() { }

  setEmail(email: string) {
    this.userEmail = email;
  }

  setPassword(password: string) {
    this.userPassword = password;
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
