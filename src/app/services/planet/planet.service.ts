import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Planet, PlanetData } from 'src/app/models/planet';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  planets$: Observable<any[]>;
  planetCollection: AngularFirestoreCollection<Planet>;
  userPlanetCollection: AngularFirestoreCollection<Planet>;

  constructor(private angularFirestore: AngularFirestore) {
    this.planetCollection = this.angularFirestore.collection<Planet>("planets");

    this.planets$ = this.angularFirestore.collection("planets").snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => new Planet(action.payload.doc.id, action.payload.doc.data() as PlanetData));
      })
    );
  }

  addNewUserPlanet(user: User, planet: Planet) {
    this.userPlanetCollection = this.angularFirestore.collection<Planet>("users/" + user.userId + "/planets");
    this.userPlanetCollection.doc(planet.name).set(Object.assign({}, planet));
  }
}