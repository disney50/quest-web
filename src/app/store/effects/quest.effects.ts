import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import * as actions from '../actions/';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { Quest, QuestData } from 'src/app/models/quest';

@Injectable()
export class QuestEffects {

    constructor(private actions$: Actions,
        private angularFirestore: AngularFirestore) { }
    planetName: string;
    userId: string;

    @Effect()
    CheckInProgressQuestExists$ = this.actions$.pipe(
        ofType(actions.REQUEST_IN_PROGRESS_QUEST_EXISTS),
        switchMap((action: actions.RequestInProgressQuestExists) => {
            this.planetName = action.planetNamePayload;
            this.userId = action.userIdPayload;
            return this.angularFirestore
                .collection(this.planetName + '/explorers/entries/' + this.userId + '/quests', ref => ref
                    .where('status', '==', 'inprogress')).get();
        }),
        map(snapShot => {
            if (snapShot.size === 0) {
                return new actions.RequestModeratingQuestExists();
            } else {
                return new actions.RequestGetInProgressQuest();
            }
        })
    );

    @Effect()
    GetInProgressQuest$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_IN_PROGRESS_QUEST),
        switchMap((action: actions.RequestGetInProgressQuest) => {
            return this.angularFirestore
                .collection(this.planetName + '/explorers/entries/' + this.userId + '/quests', ref => ref
                    .where('status', '==', 'inprogress')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetQuestSuccess(new Quest(action.payload.doc.id, action.payload.doc.data() as QuestData));
            }
            return new actions.UnimplementedAction('');
        })
    );

    @Effect()
    CheckModeratingQuestExists$ = this.actions$.pipe(
        ofType(actions.REQUEST_MODERATING_QUEST_EXISTS),
        switchMap((action: actions.RequestModeratingQuestExists) => {
            return this.angularFirestore
                .collection(this.planetName + '/explorers/entries/' + this.userId + '/quests', ref => ref
                    .where('status', '==', 'moderating')).get();
        }),
        map(snapShot => {
            if (snapShot.size === 0) {
                return new actions.NoCurrentQuest();
            }
            return new actions.RequestGetModeratingQuest();
        })
    );

    @Effect()
    GetModeratingQuest$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_MODERATING_QUEST),
        switchMap((action: actions.RequestGetModeratingQuest) => {
            return this.angularFirestore
                .collection(this.planetName + '/explorers/entries/' + this.userId + '/quests', ref => ref
                    .where('status', '==', 'moderating')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetQuestSuccess(new Quest(action.payload.doc.id, action.payload.doc.data() as QuestData));
            }
            return new actions.UnimplementedAction('');
        })
    );

    @Effect()
    GetPlanetQuests$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_PLANET_QUESTS),
        switchMap((action: actions.RequestGetPlanetQuests) => {

            return this.angularFirestore.collection(action.payload + '/quests/entries/', ref => ref.orderBy('order')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetPlanetQuestsSuccess(new Quest(action.payload.doc.id, action.payload.doc.data() as QuestData));
            }
            return new actions.UnimplementedAction('');
        })
    );

    @Effect()
    GetExplorerQuests$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_EXPLORER_QUESTS),
        switchMap((action: actions.RequestGetExplorerQuests) => {
            return this.angularFirestore
                .collection(action.planetNamePayload + '/explorers/entries/' + action.userIdPayload + '/quests/', ref => ref
                .orderBy('comment_last_view_date')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetExplorerQuestsSuccess(new Quest(action.payload.doc.id, action.payload.doc.data() as QuestData));
            }
            return new actions.UnimplementedAction('');
        })
    );

    @Effect()
    GetSelectedQuest$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_SELECTED_QUEST),
        switchMap((action: actions.RequestGetSelectedQuest) => {
            return this.angularFirestore.collection(action.planetNamePayload + '/quests/entries/').doc(action.questIdPayload).get();
        }),
        map(snapShot => {
            if (snapShot.exists) {
                return new actions.GetQuestSuccess(new Quest(snapShot.id, snapShot.data() as QuestData));
            }
            return new actions.UnimplementedAction('');
        })
    );
}
