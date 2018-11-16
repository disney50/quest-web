import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { AngularFirestore } from "@angular/fire/firestore";
import * as actions from '../actions/';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { Quest, QuestData } from "src/app/models/quest";

@Injectable()
export class QuestEffects {

    constructor(private actions$: Actions, 
        private angularFirestore: AngularFirestore) {}

    @Effect() 
    GetCurrentQuest$ = this.actions$.ofType(actions.REQUEST_GET_CURRENT_QUEST).pipe(
        switchMap((action: actions.RequestGetCurrentQuest) => {
            return this.angularFirestore.collection(action.planetNamePayload + "/explorers/entries/" + action.userIdPayload + "/quests", ref => ref
                .where('status', '==', 'in_progress' || 'moderating')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if(action.type === "added") {
                return new actions.GetQuestSuccess(new Quest(action.payload.doc.id, action.payload.doc.data() as QuestData));
            }
            return new actions.UnimplementedAction("");
        })
    );    
}