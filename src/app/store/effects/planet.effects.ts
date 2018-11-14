import * as actions from '../actions';
import * as selectors from '../selectors';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { Planet, PlanetData } from 'src/app/models/planet';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { User } from 'src/app/models/user';

@Injectable() 
export class PlanetEffects {
    
    constructor(private actions$: Actions,
        private store$: Store<AppState>, 
        private angularFirestore: AngularFirestore) {}

    signedInUser: User;    

    @Effect() 
    GetPlanets$ = this.actions$.ofType(actions.REQUEST_GET_ALL_PLANETS).pipe(
        switchMap((action: actions.RequestGetAllPlanets) => {
            return this.angularFirestore.collection("planets").stateChanges()
        }),
        mergeMap(actions => actions),
        map(action => {
            if(action.type === "added") {
                return new actions.GetAllPlanetsSuccess(new Planet(action.payload.doc.id, action.payload.doc.data() as PlanetData));
            }
            return new actions.UnimplementedAction("");
        })
    );

    @Effect()
    GetDefaultPlanet$ = this.actions$.ofType(actions.REQUEST_GET_DEFAULT_PLANET).pipe(
        switchMap((action: actions.RequestGetDefaultPlanet) => {
            this.store$.select(selectors.signedInUser).subscribe(signedInUser => {
                this.signedInUser = signedInUser;
            })                                    
            return this.angularFirestore.collection("users/" + this.signedInUser.userId + "/planets", ref => ref.limit(1)).stateChanges();
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