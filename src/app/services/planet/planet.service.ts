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
    console.log("getAllPlanets() in planet.service");
    
    this.store.dispatch(new actions.RequestGetPlanets);

    this.store.select("planet").subscribe(planetState => {
      console.log("planetState.allPlanets.length: " + planetState.allPlanets.length + " in planet.service");
      
      this.allPlanets = planetState.allPlanets;            
    });
    console.log("this.allPlanets.length: " + this.allPlanets.length + " in planet.service");
    
    return this.allPlanets;
  }

  addNewUserPlanet(planet: Planet) {
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
}