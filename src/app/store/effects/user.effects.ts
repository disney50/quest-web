import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as actions from '../actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, UserData } from 'src/app/models/user';

@Injectable()
export class UserEffects {

    constructor(private actions$: Actions,
        private angularFirestore: AngularFirestore) { }


    @Effect()
    RequestUserLogin$ = this.actions$.ofType(actions.REQUEST_LOGIN_USER_EXISTS).pipe(
        switchMap((action: actions.RequestLoginUserExists) => {
            return this.angularFirestore.collection('users', ref => ref
                .where('email', '==', action.payload.email).where('password', '==', action.payload.password)).get();
        }),
        map(snapShot => {
            if (snapShot.size === 0) {
                return new actions.LoginFailed();
            }
            return new actions.RequestGetUserByLoginDetails
                ({ email: snapShot.docs[0].data().email, password: snapShot.docs[0].data().password });
        })
    );

    @Effect()
    GetUserByLoginDetails$ = this.actions$.ofType(actions.REQUEST_GET_USER_BY_LOGIN_DETAILS).pipe(
        switchMap((action: actions.RequestGetUserByLoginDetails) => {
            return this.angularFirestore.collection('users', ref => ref
                .where('email', '==', action.payload.email).where('password', '==', action.payload.password).limit(1)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.LoginSuccess(new User(action.payload.doc.id, action.payload.doc.data() as UserData));
            }
            return new actions.UnimplementedAction('');
        })
    );

    @Effect()
    LogOutUser$ = this.actions$.ofType(actions.LOG_OUT_USER).pipe(
        switchMap(action => {
            return [new actions.ClearUserState(),
            new actions.ClearPlanetState(),
            new actions.ClearExplorerState(),
            new actions.ClearQuestState(),
            new actions.ClearCommentState()];
        })
    );
}
