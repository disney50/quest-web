import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import * as actions from '../actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { AngularFirestore } from "@angular/fire/firestore";
import { User, UserData } from "src/app/models/user";

@Injectable()
export class UserEffects {

    constructor(private actions$: Actions, private angularFirestore: AngularFirestore) {}

    @Effect()
    GetUser$ = this.actions$.ofType(actions.REQUEST_GET_USER).pipe(
        switchMap((action: actions.RequestGetUser) => {                        
            return this.angularFirestore.collection("users").stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if(action.type === "added") {
                return new actions.GetUserSuccess(new User(action.payload.doc.id, action.payload.doc.data() as UserData));
            }
            return new actions.UnimplementedAction("");
        })
    )
}