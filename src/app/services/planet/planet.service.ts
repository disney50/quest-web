import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Planet } from 'src/app/models/planet';
import { GlobalService } from '../global/global.service';
import { AppState } from 'src/app/store/app-state';
import { Store } from '@ngrx/store';
import * as actions from '../../store/actions';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  // planets$: Observable<any[]>;
  // planetCollection: AngularFirestoreCollection<Planet>;
  allPlanets: Planet[];

  constructor(private angularFirestore: AngularFirestore,
    private globalService: GlobalService,
    private store: Store<AppState>) {
    // this.planetCollection = this.angularFirestore.collection<Planet>("planets");

    // this.planets$ = this.angularFirestore.collection("planets").snapshotChanges().pipe(
    //   map(actions => {
    //     return actions.map(action => new Planet(action.payload.doc.id, action.payload.doc.data() as PlanetData));
    //   })
    // );
  }

  getAllPlanets(): Planet[] {
    console.log("2.getAllPlanets()");
    
    this.store.dispatch(new actions.RequestGetPlanets);

    this.store.select("planet").subscribe(planetState => {
      console.log("2.1.planetState.allPlanets: ", planetState.allPlanets);
      
      this.allPlanets = planetState.allPlanets;
      console.log("2.2.this.allPlanets: ", this.allPlanets);
            
    });    
    return this.allPlanets;
  }

  addNewUserPlanet(planet: Planet) {
    console.log("addNewUserPlanet in planet.service", this.globalService.signedInUser);
    
    this.angularFirestore.collection<Planet>("users/" + this.globalService.signedInUser.userId + "/planets")
    .doc(planet.name).set(planet);
    // this.userPlanetCollection.doc(planet.name).set(Object.assign({}, planet));
    this.globalService.setCurrentPlanet(planet);


    this.getCurrentPlanet();
  }

  getCurrentPlanet() {
    this.store.dispatch(new actions.RequestGetCurrentPlanet);

    this.store.select("planet").subscribe(planetState => {
      this.globalService.setCurrentPlanet(planetState.currentPlanet);
    });
  }

  getUserPlanet() {
    console.log("7.getUserPlanet()");
        
    this.store.dispatch(new actions.RequestGetUserPlanet);

    this.store.select("planet").subscribe(planetState => {
      console.log("7.1.planetState.currentPlanet: ", planetState.currentPlanet);
            
      this.globalService.setCurrentPlanet(planetState.currentPlanet);
      console.log("7.2.this.globalService.currentPlanet:", this.globalService.currentPlanet);
    });
  }
}