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
    GetSignedInUser$ = this.actions$.ofType(actions.REQUEST_GET_SIGNED_IN_USER).pipe(
        switchMap(action => {                        
            return this.angularFirestore.collection("users", ref => ref.where('userId', '==', this.globalService.signedInUser.userId)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if(action.type === "added") {
                return new actions.GetSignedInUserSuccess(new User(action.payload.doc.id, action.payload.doc.data() as UserData));
            }
            return new actions.UnimplementedAction("");
        })
    )

    @Effect()
    SignInUser$ = this.actions$.ofType(actions.REQUEST_USER_SIGN_IN).pipe(
        switchMap(action => {                        
            return this.angularFirestore.collection("users", ref => ref.where('email', '==', this.globalService.email).where('password', '==', this.globalService.password).limit(1)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if(action.type === "added") {
                return new actions.UserSignInSuccess(new User(action.payload.doc.id, action.payload.doc.data() as UserData));
            }
            return new actions.UnimplementedAction("");
        })
    )

    @Effect()
    RemoveSignedInUser$ = this.actions$.ofType(actions.REMOVE_SIGNED_IN_USER).pipe(
        switchMap(action => {                        
            return this.angularFirestore.collection("users", ref => ref.where('userId', '==', this.globalService.signedInUser.userId)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            return new actions.RemoveSignedInUser();
        })
    )
}