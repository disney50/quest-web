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
    GetComments$ = this.actions$.ofType(actions.REQUEST_GET_COMMENTS).pipe(
        switchMap((action: actions.RequestGetComments) => {                        
            return this.angularFirestore.collection(action.planetNamePayload + "/explorers/entries/" + action.userIdPayload + "/quests/" + action.questIdPayload + "/comments", ref => ref.orderBy('timestamp')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {                        
            if(action.type === "added") {                
                return new actions.GetCommentSuccess(new Comment(action.payload.doc.data() as CommentData));
            }
            return new actions.UnimplementedAction("");
        })
    );
}