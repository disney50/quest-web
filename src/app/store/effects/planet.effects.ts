import * as actions from '../actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { Planet, PlanetData } from 'src/app/models/planet';

@Injectable()
export class PlanetEffects {

    constructor(private actions$: Actions,
        private angularFirestore: AngularFirestore) { }

    @Effect()
    GetPlanets$ = this.actions$.ofType(actions.REQUEST_GET_PLANETS).pipe(
        switchMap((action: actions.RequestGetPlanets) => {
            return this.angularFirestore.collection('planets').stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetPlanetsSuccess(new Planet(action.payload.doc.id, action.payload.doc.data() as PlanetData));
            }
            return new actions.UnimplementedAction('');
        })
    );

    @Effect()
    GetDefaultPlanet$ = this.actions$.ofType(actions.REQUEST_GET_DEFAULT_PLANET).pipe(
        switchMap((action: actions.RequestGetDefaultPlanet) => {
            return this.angularFirestore.collection('users/' + action.payload + '/planets').doc('codeez').get();
        }),
        map(snapShot => {
            if (snapShot.exists) {
                return new actions.GetPlanetSuccess(new Planet(snapShot.id, snapShot.data() as PlanetData));
            }
            return new actions.UnimplementedAction('');
        })
    );

}
