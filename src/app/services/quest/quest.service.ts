import { Injectable } from '@angular/core';
import { Quest, QuestData } from 'src/app/models/quest';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Explorer } from 'src/app/models/explorer';
import { CommentData, Comment } from 'src/app/models/comment';
import { QuestWithNewComments } from 'src/app/models/quest-with-new-comments';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  planetQuestsIds: string[] = [];
  explorerQuestsIds: string[] = [];
  possibleQuestsIds: string[] = [];
  possibleQuest: Quest = {} as Quest;
  possibleQuests: Quest[] = [];
  prerequisiteQuest: Quest = {} as Quest;

  constructor(private angularFirestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  createNewQuest(currentPlanetName: string, newQuest: Quest) {
    newQuest.questId = this.angularFirestore.createId();
    this.angularFirestore.collection(currentPlanetName + '/quests/entries').doc(newQuest.questId).set(newQuest);
  }

  submitQuest(planetName: string, userId: string, currentQuest: Quest) {
    currentQuest.status = 'moderating';
    currentQuest.comment_last_view_date = firebase.firestore.Timestamp.now();

    this.angularFirestore.collection(planetName + '/explorers/entries/' + userId + '/quests/')
      .doc(currentQuest.questId).update(currentQuest.toData());
  }

  moderateQuest(planetName: string, selectedExplorer: Explorer, selectedQuest: Quest) {
    this.updateLastViewCommentDate(planetName, selectedExplorer.userId, selectedQuest.questId);

    this.angularFirestore.collection(planetName + '/explorers/entries/' + selectedExplorer.userId + '/quests/')
      .doc(selectedQuest.questId).update(selectedQuest.toData());

    this.angularFirestore.collection(planetName + '/explorers/entries/')
      .doc(selectedExplorer.userId).update(selectedExplorer.toData());
  }

  launchQuest(planetName: string, userId: string, currentQuest: Quest) {
    currentQuest.status = 'inprogress';
    currentQuest.comment_last_view_date = firebase.firestore.Timestamp.now();

    this.angularFirestore.collection(planetName + '/explorers/entries/' + userId + '/quests/')
      .doc(currentQuest.questId).set(currentQuest.toData());
  }

  checkIfPrerequisiteQuestCompleted(planetName: string, userId: string, possibleQuest: Quest): boolean {
    this.prerequisiteQuest = {} as Quest;

    if (possibleQuest.prerequisites.length > 0) {
      this.angularFirestore.collection(planetName + '/explorers/entries/' + userId + '/quests/')
        .doc(possibleQuest.prerequisites[0]).ref.onSnapshot(snapShot => {

          if (snapShot.exists) {
            this.prerequisiteQuest = new Quest(snapShot.id, snapShot.data() as QuestData);

            if (this.prerequisiteQuest.status === 'completed') {
              possibleQuest.isAvailable = true;
            } else {
              possibleQuest.isAvailable = false;
            }
          }

        });
    } else {
      possibleQuest.isAvailable = true;
    }

    return possibleQuest.isAvailable;
  }

  getPossibleQuests(planetQuests: Quest[], explorerQuests: Quest[], planetName: string, userId: string): Quest[] {
    this.possibleQuests = [];

    planetQuests.forEach(planetQuest => {
      if (this.planetQuestsIds.indexOf(planetQuest.questId) === -1) {
        this.planetQuestsIds.push(planetQuest.questId);
      }
    });

    explorerQuests.forEach(explorerQuest => {
      if (this.explorerQuestsIds.indexOf(explorerQuest.questId) === -1) {
        this.explorerQuestsIds.push(explorerQuest.questId);
      }
    });

    this.planetQuestsIds.forEach(planetQuestId => {
      if (this.explorerQuestsIds.indexOf(planetQuestId) === -1) {
        this.possibleQuest = planetQuests.find(function (planetQuest) {
          return planetQuest.questId === planetQuestId;
        });

        this.possibleQuests.push(this.possibleQuest);
      }
    });

    this.possibleQuests.forEach(possibleQuest => {
      possibleQuest.isAvailable = this.checkIfPrerequisiteQuestCompleted(planetName, userId, possibleQuest);
    });

    return this.possibleQuests;
  }

  updateLastViewCommentDate(planetName: string, userId: string, questId: string) {
    // let updatedQuest = {} as Quest;
    // updatedQuest = currentQuest;
    // updatedQuest.comment_last_view_date = firebase.firestore.Timestamp.now();

    // this.angularFirestore.collection(planetName + '/explorers/entries/' + userId + '/quests/')
    //   .doc(updatedQuest.questId).set(updatedQuest.toData());

    const comment_last_view_date = firebase.firestore.Timestamp.now();

    this.angularFirestore.collection(planetName + '/explorers/entries/' + userId + '/quests/')
      .doc(questId).update({ comment_last_view_date: comment_last_view_date });
  }

  createQuestWithNewComments(explorerQuest: Quest) {
    const newQuestWithNewComments = {} as QuestWithNewComments;
    newQuestWithNewComments.comment_last_view_date = explorerQuest.comment_last_view_date;
    newQuestWithNewComments.description = explorerQuest.description;
    newQuestWithNewComments.isAvailable = explorerQuest.isAvailable;
    newQuestWithNewComments.level1 = explorerQuest.level1;
    newQuestWithNewComments.level2 = explorerQuest.level2;
    newQuestWithNewComments.max_xp = explorerQuest.max_xp;
    newQuestWithNewComments.newComments = false;
    newQuestWithNewComments.order = explorerQuest.order;
    newQuestWithNewComments.prerequisites = explorerQuest.prerequisites;
    newQuestWithNewComments.questId = explorerQuest.questId;
    newQuestWithNewComments.status = explorerQuest.status;
    newQuestWithNewComments.title = explorerQuest.title;
    return newQuestWithNewComments;
  }

  createQuestsWithNewCommentsArray(explorerQuests: Quest[], planetName: string, selectedExplorerUserId: string) {
    const newQuestsWithNewCommentsArray = [];
    const newQuestsWithNewCommentsIds = [];

    explorerQuests.forEach(explorerQuest => {
      const newQuestWithNewComments = this.createQuestWithNewComments(explorerQuest);
      if (newQuestsWithNewCommentsIds.indexOf(newQuestWithNewComments.questId) === -1) {
        newQuestsWithNewCommentsArray.push(newQuestWithNewComments);
        newQuestsWithNewCommentsIds.push(newQuestWithNewComments.questId);
      }
    });

    newQuestsWithNewCommentsArray.forEach(newQuestWithNewComments => {
      this.angularFirestore
        .collection(planetName + '/explorers/entries/' + selectedExplorerUserId + '/quests/' + newQuestWithNewComments.questId + '/comments/', ref => ref
          .where('timestamp', '>', newQuestWithNewComments.comment_last_view_date))
        .get()
        .subscribe(newComments => {
          if (newComments.size > 0) {
            newQuestWithNewComments.newComments = true;
          }
        });
    });

    this.store.dispatch(new actions.GetQuestsWithNewCommentsSuccess(newQuestsWithNewCommentsArray));
  }
}
