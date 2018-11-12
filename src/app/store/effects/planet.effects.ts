import * as actions from '../actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { Planet, PlanetData } from 'src/app/models/planet';
import { GlobalService } from 'src/app/services/global/global.service';

@Injectable() 
export class PlanetEffects {
    
    constructor(private actions$: Actions, 
        private angularFirestore: AngularFirestore,
        private globalService: GlobalService) {}

    @Effect() 
    GetPlanets$ = this.actions$.ofType(actions.REQUEST_GET_PLANETS).pipe(
        switchMap(action => {
            return this.angularFirestore.collection("planets").stateChanges()
        }),
        mergeMap(actions => actions),
        map(action => {
            if(action.type === "added") {
                return new actions.GetPlanetsSuccess(new Planet(action.payload.doc.id, action.payload.doc.data() as PlanetData));
            }
            return new actions.UnimplementedAction("");
        })
    );

    @Effect()
    GetCurrentPlanet$ = this.actions$.ofType(actions.REQUEST_GET_CURRENT_PLANET).pipe(
        switchMap(action => {

            return this.angularFirestore.collection("users/" + this.globalService.signedInUser.userId + "/planets", ref => ref.where('name', '==', this.globalService.currentPlanet.name)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if(action.type === "added") {
                return new actions.GetPlanetSuccess(new Planet(action.payload.doc.id, action.payload.doc.data() as PlanetData));
            }
            return new actions.UnimplementedAction("");
        })
    )

    @Effect()
    GetUserPlanet$ = this.actions$.ofType(actions.REQUEST_GET_USER_PLANET).pipe(
        switchMap(action => {                        
            return this.angularFirestore.collection("users/" + this.globalService.signedInUser.userId + "/planets", ref => ref.limit(1)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if(action.type === "added") {
                return new actions.GetPlanetSuccess(new Planet(action.payload.doc.id, action.payload.doc.data() as PlanetData));
            }
            return new actions.UnimplementedAction("");
        })
    )
    
}