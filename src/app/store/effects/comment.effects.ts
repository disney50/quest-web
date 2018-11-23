import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { AngularFirestore } from "@angular/fire/firestore";
import * as actions from '../../store/actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { Comment, CommentData } from "src/app/models/comment";

@Injectable()
export class CommentEffects {

    constructor(private actions$: Actions, 
        private angularFirestore: AngularFirestore) {

    }

    @Effect() 
    GetPlanets$ = this.actions$.ofType(actions.REQUEST_GET_ALL_COMMENTS).pipe(
        switchMap((action: actions.RequestGetAllComments) => {            
            return this.angularFirestore.collection(action.planetNamePayload + "/explorers/entries/" + action.userIdPayload + "/quests/" + action.questIdPayload + "/comments").stateChanges()
        }),
        mergeMap(actions => actions),
        map(action => {
            if(action.type === "added") {                
                return new actions.GetCommentSuccess(new Comment(action.payload.doc.id, action.payload.doc.data() as CommentData));
            }
            return new actions.UnimplementedAction("");
        })
    );
}