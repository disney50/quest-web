import { Injectable } from '@angular/core';
import * as actions from '../../store/actions';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { GlobalService } from '../global/global.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private store: Store<AppState>, 
    private globalService: GlobalService,
    private angularFirestore: AngularFirestore,
    private router: Router) {}
  
  authenticateUser(email: string, password: string): Observable<DocumentChangeAction<{}>[]> {     
    return this.angularFirestore
    .collection('users', ref => ref.where('email', "==", email).where('password', '==', password))
    .stateChanges();
  }

  getEnteredEmailAndPassword(email: string, password: string) {
    this.globalService.setEmail(email);
    this.globalService.setPassword(password);
  }

  signInExistingUser() {
      this.store.dispatch(new actions.RequestGetExistingUser);

      this.store.select("user").subscribe(userState => {                
          this.globalService.signedInUser.email = userState.signedInUser.email;
          this.globalService.signedInUser.gender = userState.signedInUser.gender;
          this.globalService.signedInUser.name = userState.signedInUser.name;
          this.globalService.signedInUser.password = userState.signedInUser.password;
          this.globalService.signedInUser.surname = userState.signedInUser.surname;
          this.globalService.signedInUser.userId = userState.signedInUser.userId;
          
          this.getUserPlanet();
      });    
  }

  getUserPlanet() {    
    this.store.dispatch(new actions.RequestGetUserPlanet);

    this.store.select("planet").subscribe(planetState => {      
      this.globalService.currentPlanet.name = planetState.currentPlanet.name;
      this.globalService.currentPlanet.description = planetState.currentPlanet.description;

      this.getPlanetExlorer();    
    });
  }

  getPlanetExlorer() {
    this.store.dispatch(new actions.RequestGetCurrentExplorer);

    this.store.select("explorer").subscribe(explorerState => {      
      this.globalService.currentExplorer.name = explorerState.currentExplorer.name;
      this.globalService.currentExplorer.surname = explorerState.currentExplorer.surname;      
      this.globalService.currentExplorer.xp = explorerState.currentExplorer.xp;      
      this.globalService.currentExplorer.userId = explorerState.currentExplorer.userId;

      this.navigateDashboard();
    });

  }

  navigateDashboard() {
    this.router.navigateByUrl("dashboard");
  }

  logOutUser() {
    this.store.dispatch(new actions.LogOutUser);
  }
}
