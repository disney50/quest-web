import { Injectable } from '@angular/core';
import { Quest, QuestData } from 'src/app/models/quest';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Explorer } from 'src/app/models/explorer';
import { CommentData, Comment } from 'src/app/models/comment';

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

  constructor(private angularFirestore: AngularFirestore) { }

  createNewQuest(currentPlanetName: string, newQuest: Quest) {
    newQuest.questId = this.angularFirestore.createId();
    this.angularFirestore.collection(currentPlanetName + '/quests/entries').doc(newQuest.questId).set(newQuest);
  }

  submitQuest(planetName: string, userId: string, currentQuest: Quest) {
    currentQuest.status = 'moderating';

    this.angularFirestore.collection(planetName + '/explorers/entries/' + userId + '/quests/')
      .doc(currentQuest.questId).update(currentQuest.toData());
  }

  moderateQuest(planetName: string, selectedExplorer: Explorer, selectedQuest: Quest) {
    this.angularFirestore.collection(planetName + '/explorers/entries/' + selectedExplorer + '/quests/')
      .doc(selectedQuest.questId).update(selectedQuest.toData());

    this.angularFirestore.collection(planetName + '/explorers/entries/')
      .doc(selectedExplorer.userId).update(selectedExplorer.toData());
  }

  launchQuest(planetName: string, userId: string, currentQuest: Quest) {
    currentQuest.status = 'inprogress';

    this.angularFirestore.collection(planetName + '/explorers/entries/' + userId + '/quests/')
      .doc(currentQuest.questId).set(currentQuest.toData());
  }

  checkIfPrerequisiteQuestCompleted(planetName: string, userId: string, possibleQuest: Quest): boolean {
    this.prerequisiteQuest = {} as Quest;

    if (possibleQuest.prerequisites.length !== 0) {
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

  updateLastViewCommentDate(planetName: string, userId: string, currentQuest: Quest) {
    let updatedQuest = {} as Quest;
    updatedQuest = currentQuest;
    updatedQuest.comment_last_view_date = firebase.firestore.Timestamp.now();
    this.angularFirestore.collection(planetName + '/explorers/entries/' + userId + '/quests/')
      .doc(updatedQuest.questId).set(updatedQuest.toData());
  }

  getNumberNewCommentsForQuest(planetName: string, explorerUserId: string, explorerQuests: Quest[]) {
    explorerQuests.forEach(explorerQuest => {
      this.angularFirestore.collection(planetName + '/explorers/entries/' + explorerUserId + '/quests/' + explorerQuest.questId + '/comments/')
        .get().subscribe(documents => {
          explorerQuest.newComments = 0;
          documents.forEach(document => {
            let comment = {} as Comment;
            comment = new Comment(document.data() as CommentData);
            if (comment.timestamp > explorerQuest.comment_last_view_date) {
              explorerQuest.newComments = explorerQuest.newComments + 1;
            }
          });
        });
    });

    return explorerQuests;
  }
}
