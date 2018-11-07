import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import * as actions from '../actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { AngularFirestore } from "@angular/fire/firestore";
import { User, UserData } from "src/app/models/user";
import { GlobalService } from "src/app/services/global/global.service";

@Injectable()
export class UserEffects {

    constructor(private actions$: Actions, 
        private angularFirestore: AngularFirestore,
        private globalService: GlobalService) {}

    @Effect()
    GetNewUser$ = this.actions$.ofType(actions.REQUEST_GET_NEW_USER).pipe(
        switchMap(action => {                        
            return this.angularFirestore.collection("users", ref => ref.where('userId', '==', this.globalService.signedInUser.userId)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if(action.type === "added") {
                return new actions.GetUserSuccess(new User(action.payload.doc.id, action.payload.doc.data() as UserData));
            }
            return new actions.UnimplementedAction("");
        })
    )

    @Effect()
    GetExistingUser$ = this.actions$.ofType(actions.REQUEST_GET_EXISTING_USER).pipe(
        switchMap(action => {                      
            return this.angularFirestore.collection("users", ref => ref.where('email', '==', this.globalService.userEmail).where('password', '==', this.globalService.userPassword).limit(1)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if(action.type === "added") {
                return new actions.GetUserSuccess(new User(action.payload.doc.id, action.payload.doc.data() as UserData));
            }
            return new actions.UnimplementedAction("");
        })
    )

    @Effect()
    LogOutUser$ = this.actions$.ofType(actions.LOG_OUT_USER).pipe(
        switchMap(action => {                                   
            return this.angularFirestore.collection("users", ref => ref.where('userId', '==', this.globalService.signedInUser.userId)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            return new actions.LogOutUser();
        })
    )
}