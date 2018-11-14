import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import * as actions from '../actions';
import * as selectors from '../selectors';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { AngularFirestore } from "@angular/fire/firestore";
import { Explorer, ExplorerData } from "src/app/models/explorer";
import { Store } from "@ngrx/store";
import { AppState } from "../app-state";
import { User } from "src/app/models/user";
import { Planet } from "src/app/models/planet";

@Injectable()
export class ExplorerEffects {

    constructor(private actions$: Actions,
        private store$: Store<AppState>, 
        private angularFirestore: AngularFirestore) {}
    
    signedInUser: User;
    currentPlanet: Planet;

    @Effect()
    GetCurrentExplorer$ = this.actions$.ofType(actions.REQUEST_GET_EXPLORER).pipe(
        switchMap((action: actions.RequestGetExplorer) => {
            this.store$.select(selectors.signedInUser).subscribe(signedInUser => {
                this.signedInUser = signedInUser;
            })

            this.store$.select(selectors.currentPlanet).subscribe(currentPlanet => {
                this.currentPlanet = currentPlanet;
            })
                                                                        
            return this.angularFirestore.collection(this.currentPlanet.name + "/explorers/entries", ref => ref.where('userId', '==', this.signedInUser.userId)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if(action.type === "added") {
                return new actions.GetExplorerSuccess(new Explorer(action.payload.doc.id, action.payload.doc.data() as ExplorerData));
            }
            return new actions.UnimplementedAction("");
        })
    )
}