import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as actions from '../actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, UserData } from 'src/app/models/user';
import { PlanetService } from 'src/app/services/planet/planet.service';
import { Planet, PlanetData } from 'src/app/models/planet';

@Injectable()
export class UserEffects {
    email: string;
    password: string;
    user: User = {} as User;


    constructor(private actions$: Actions,
        private angularFirestore: AngularFirestore,
        private planetService: PlanetService) { }

    @Effect()
    RequestUserExistsUsers$ = this.actions$.ofType(actions.REQUEST_USER_EXISTS_USERS).pipe(
        switchMap((action: actions.RequestUserExistsUsers) => {

            this.email = action.payload.email;
            this.password = action.payload.password;
            return this.angularFirestore.collection('users', ref => ref.where('email', '==', this.email)).get();
        }),
        map(snapShot => {
            if (snapShot.size === 0) {

                return new actions.RequestUserExistsExplorers();
            } else {

                if (snapShot.docs[0].data().password === undefined) {
                    this.user = new User(snapShot.docs[0].data().userId, snapShot.docs[0].data() as UserData);
                    this.user.password = this.password;
                    this.angularFirestore.collection('users').doc(this.user.userId).update(this.user.toData());
                    return new actions.RequestGetUserByLoginDetails();
                } else {
                    return new actions.RequestGetUserByLoginDetails();
                }
            }
        })
    );


    @Effect()
    RequestUserExistsExplorers$ = this.actions$.ofType(actions.REQUEST_USER_EXISTS_EXPLORERS).pipe(
        switchMap((action: actions.RequestUserExistsExplorers) => {

            return this.angularFirestore.collection('codeez/explorers/entries', ref => ref.where('email', '==', this.email)).get();
        }),
        map(snapShot => {
            if (snapShot.size === 0) {

                return new actions.LoginFailed();
            } else {

                if (snapShot.docs[0].data().password === undefined) {

                    this.user = new User(snapShot.docs[0].id, {
                        gender: snapShot.docs[0].data().gender,
                        name: snapShot.docs[0].data().name,
                        surname: snapShot.docs[0].data().surname,
                        userId: snapShot.docs[0].id,
                        email: snapShot.docs[0].data().email,
                        password: this.password
                    } as UserData);

                    this.angularFirestore.collection('users').doc(this.user.userId).set(this.user.toData());
                    this.planetService.createPlanet
                        (this.user.userId, new Planet
                            ('codeez', { name: 'codeez', description: 'learn to code with python' } as PlanetData));
                    return new actions.RequestGetUserByLoginDetails();
                } else {

                    return new actions.RequestGetUserByLoginDetails();
                }
            }
        })
    );

    @Effect()
    GetUserByLoginDetails$ = this.actions$.ofType(actions.REQUEST_GET_USER_BY_LOGIN_DETAILS).pipe(
        switchMap((action: actions.RequestGetUserByLoginDetails) => {
            return this.angularFirestore.collection('users', ref => ref
                .where('email', '==', this.email).where('password', '==', this.password).limit(1)).stateChanges();
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
