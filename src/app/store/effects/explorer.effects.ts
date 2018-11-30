import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import * as actions from '../actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { AngularFirestore } from "@angular/fire/firestore";
import { Explorer, ExplorerData } from "src/app/models/explorer";

@Injectable()
export class ExplorerEffects {

    constructor(private actions$: Actions,
        private angularFirestore: AngularFirestore) {}

    @Effect()
    GetExplorer$ = this.actions$.ofType(actions.REQUEST_GET_EXPLORER).pipe(
        switchMap((action: actions.RequestGetExplorer) => {                                     
            return this.angularFirestore.collection(action.planetNamePayload + "/explorers/entries", ref => ref.where('userId', '==', action.userIdPayload)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if(action.type === "added") {
                return new actions.GetExplorerSuccess(new Explorer(action.payload.doc.id, action.payload.doc.data() as ExplorerData));
            }
            return new actions.UnimplementedAction("");
        })
    );
}