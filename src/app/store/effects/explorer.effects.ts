import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import * as actions from '../actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { AngularFirestore } from "@angular/fire/firestore";
import { GlobalService } from "src/app/services/global/global.service";
import { Explorer, ExplorerData } from "src/app/models/explorer";

@Injectable()
export class ExplorerEffects {

    constructor(private actions$: Actions, 
        private angularFirestore: AngularFirestore, 
        private globalService: GlobalService) {}

    @Effect()
    GetExplorers$ = this.actions$.ofType(actions.REQUEST_GET_EXPLORER).pipe(
        switchMap(action => {                        
            return this.angularFirestore.collection(this.globalService.currentPlanet + "explorers/entries").stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if(action.type === "added") {
                return new actions.GetExplorerSuccess(new Explorer(action.payload.doc.data() as ExplorerData));
            }
            return new actions.UnimplementedAction("");
        })
    )
}