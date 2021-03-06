import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Explorer } from 'src/app/models/explorer';
import { User } from 'src/app/models/user';
import { Quest, QuestData } from 'src/app/models/quest';
import { Comment, CommentData } from 'src/app/models/comment';
import { QuestService } from '../quest/quest.service';
import { ExplorerRequiringModeratorAction } from 'src/app/models/explorers-requiring-moderator-action';
import { AppState } from 'src/app/store/app-state';
import { Store } from '@ngrx/store';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  newExplorer: Explorer = {} as Explorer;

  constructor(private angularFirestore: AngularFirestore,
    private questService: QuestService,
    private store: Store<AppState>
  ) { }

  createExplorer(planetName: string, newUser: User) {
    this.newExplorer.name = newUser.name;
    this.newExplorer.surname = newUser.surname;
    this.newExplorer.xp = 0;
    this.newExplorer.userId = newUser.userId;
    this.addNewExplorerToPlanet(planetName);
  }

  addNewExplorerToPlanet(planetName: string) {
    this.angularFirestore.collection(planetName + '/explorers/entries').doc(this.newExplorer.userId).set(this.newExplorer);
  }

  createExplorerRequiringModeratorAction(planetExplorer: Explorer) {
    const newExplorerRequiringModeratorAction = {} as ExplorerRequiringModeratorAction;
    newExplorerRequiringModeratorAction.isModerating = false;
    newExplorerRequiringModeratorAction.name = planetExplorer.name;
    newExplorerRequiringModeratorAction.newComments = false;
    newExplorerRequiringModeratorAction.surname = planetExplorer.surname;
    newExplorerRequiringModeratorAction.userId = planetExplorer.userId;
    newExplorerRequiringModeratorAction.xp = planetExplorer.xp;
    return newExplorerRequiringModeratorAction;
  }

  createExplorersRequiringModeratorActionArray(planetExplorers: Explorer[], planetName: string) {
    const newExplorersRequiringModeratorActionArray = [];
    const newExplorersRequiringModeratorActionIds = [];

    planetExplorers.forEach(planetExplorer => {
      const newExplorerRequiringModeratorAction = this.createExplorerRequiringModeratorAction(planetExplorer);
      if (newExplorersRequiringModeratorActionIds.indexOf(newExplorerRequiringModeratorAction.userId) === -1) {
        newExplorersRequiringModeratorActionArray.push(newExplorerRequiringModeratorAction);
        newExplorersRequiringModeratorActionIds.push(newExplorerRequiringModeratorAction.userId);
      }
    });

    newExplorersRequiringModeratorActionArray.forEach(newExplorerRequiringModeratorAction => {
      this.angularFirestore
        .collection(planetName + '/explorers/entries/' + newExplorerRequiringModeratorAction.userId + '/quests/', ref => ref
          .where('status', '==', 'moderating'))
        .get()
        .subscribe(moderatingQuests => {
          if (moderatingQuests.size > 0) {
            newExplorerRequiringModeratorAction.isModerating = true;
          }
        });
    });

    newExplorersRequiringModeratorActionArray.forEach(newExplorerRequiringModeratorAction => {
      this.angularFirestore
        .collection(planetName + '/explorers/entries/' + newExplorerRequiringModeratorAction.userId + '/quests/', ref => ref
          .where('status', '==', 'moderating'))
        // .where('status', '==', 'inprogress'))
        .get()
        .subscribe(activeQuests => {
          if (activeQuests.size > 0) {
            const newActiveQuestsArray = [];
            activeQuests.forEach(activeQuest => {
              const newActiveQuest = new Quest(activeQuest.id, activeQuest.data() as QuestData);
              if (newActiveQuest.comment_last_view_date === undefined) {
                this.questService.updateLastViewCommentDate(planetName, newExplorerRequiringModeratorAction.userId, newActiveQuest);
              }
              newActiveQuestsArray.push(newActiveQuest);
              this.angularFirestore
                .collection
                // tslint:disable-next-line: max-line-length
                (planetName + '/explorers/entries/' + newExplorerRequiringModeratorAction.userId + '/quests/' + newActiveQuest.questId + '/comments/',
                  ref => ref.where('timestamp', '>', newActiveQuest.comment_last_view_date))
                .get()
                .subscribe(newComments => {
                  if (newComments.size > 0) {
                    newExplorerRequiringModeratorAction.newComments = true;
                    this.store.dispatch(new actions.GetExplorersRequiringModerationSuccess(newExplorerRequiringModeratorAction));
                  }
                });
            });
          }
        });
    });

    newExplorersRequiringModeratorActionArray.forEach(newExplorerRequiringModeratorAction => {
      this.angularFirestore
        .collection(planetName + '/explorers/entries/' + newExplorerRequiringModeratorAction.userId + '/quests/', ref => ref
          .where('status', '==', 'inprogress'))
        // .where('status', '==', 'inprogress'))
        .get()
        .subscribe(activeQuests => {
          if (activeQuests.size > 0) {
            const newActiveQuestsArray = [];
            activeQuests.forEach(activeQuest => {
              const newActiveQuest = new Quest(activeQuest.id, activeQuest.data() as QuestData);
              if (newActiveQuest.comment_last_view_date === undefined) {
                this.questService.updateLastViewCommentDate(planetName, newExplorerRequiringModeratorAction.userId, newActiveQuest);
              }
              newActiveQuestsArray.push(newActiveQuest);
              this.angularFirestore
                .collection
                (planetName + '/explorers/entries/' + newExplorerRequiringModeratorAction.userId + '/quests/' + newActiveQuest.questId + '/comments/',
                  ref => ref.where('timestamp', '>', newActiveQuest.comment_last_view_date))
                .get()
                .subscribe(newComments => {
                  if (newComments.size > 0) {
                    newExplorerRequiringModeratorAction.newComments = true;
                  }
                });
            });
          }
        });
    });

    this.store.dispatch(new actions.GetExplorersRequiringModeratorActionSuccess(newExplorersRequiringModeratorActionArray));
  }

  createExplorerRequiringModeration(explorer: Explorer): ExplorerRequiringModeratorAction {
    const explorerRequiringModeration = {} as ExplorerRequiringModeratorAction;
    explorerRequiringModeration.isModerating = true;
    explorerRequiringModeration.name = explorer.name;
    explorerRequiringModeration.newComments = false;
    explorerRequiringModeration.surname = explorer.surname;
    explorerRequiringModeration.userId = explorer.userId;
    explorerRequiringModeration.xp = explorer.xp;
    return explorerRequiringModeration;
  }

  createExplorersRequiringModerationArray(planetExplorers: Explorer[], planetName: string) {
    const explorersRequiringModerationArray = [];

    planetExplorers.forEach(planetExplorer => {
      this.angularFirestore
        .collection(planetName + '/explorers/entries/' + planetExplorer.userId + '/quests/', ref => ref
          .where('status', '==', 'moderating'))
        .get()
        .subscribe(moderatingQuests => {
          if (moderatingQuests.size > 0) {
            explorersRequiringModerationArray.push(this.createExplorerRequiringModeration(planetExplorer));
          }
        });
    });
    this.store.dispatch(new actions.GetExplorersRequiringModerationSuccess(explorersRequiringModerationArray));
  }

  createExplorerWithNewComments(explorer: Explorer): ExplorerRequiringModeratorAction {
    const explorerWithNewComments = {} as ExplorerRequiringModeratorAction;
    explorerWithNewComments.isModerating = false;
    explorerWithNewComments.name = explorer.name;
    explorerWithNewComments.newComments = true;
    explorerWithNewComments.surname = explorer.surname;
    explorerWithNewComments.userId = explorer.userId;
    explorerWithNewComments.xp = explorer.xp;
    return explorerWithNewComments;
  }

  createExplorersWithNewCommentsArray(planetExplorers: Explorer[], planetName: string) {
    const explorersWithNewCommentsArray = [];
    const explorersWithNewCommentsIds = [];

    planetExplorers.forEach(planetExplorer => {
      this.angularFirestore
        .collection(planetName + '/explorers/entries/' + planetExplorer.userId + '/quests/', ref => ref
          .where('status', '==', 'moderating'))
        .get()
        .subscribe(moderatingQuests => {
          if (moderatingQuests.size > 0) {
            moderatingQuests.forEach(moderatingQuest => {
              const newModeratingQuest = new Quest(moderatingQuest.id, moderatingQuest.data() as QuestData);

              if (newModeratingQuest.comment_last_view_date === undefined) {
                this.questService.updateLastViewCommentDate(planetName, planetExplorer.userId, newModeratingQuest);
              }

              this.angularFirestore
                .collection
                (planetName + '/explorers/entries/' + planetExplorer.userId + '/quests/' + newModeratingQuest.questId + '/comments/',
                  ref => ref.where('timestamp', '>', newModeratingQuest.comment_last_view_date))
                .get()
                .subscribe(newComments => {
                  if (newComments.size > 0) {
                    if (explorersWithNewCommentsIds.indexOf(planetExplorer.userId) === -1) {
                      explorersWithNewCommentsIds.push(planetExplorer.userId);

                      explorersWithNewCommentsArray.push(this.createExplorerWithNewComments(planetExplorer));
                    }
                  }
                });
            });
          }
        });
    });

    planetExplorers.forEach(planetExplorer => {
      this.angularFirestore
        .collection(planetName + '/explorers/entries/' + planetExplorer.userId + '/quests/', ref => ref
          .where('status', '==', 'inprogress'))
        .get()
        .subscribe(inProgressQuests => {
          if (inProgressQuests.size > 0) {
            inProgressQuests.forEach(inProgressQuest => {
              const newInProgressQuest = new Quest(inProgressQuest.id, inProgressQuest.data() as QuestData);

              if (newInProgressQuest.comment_last_view_date === undefined) {
                this.questService.updateLastViewCommentDate(planetName, planetExplorer.userId, newInProgressQuest);
              }

              this.angularFirestore
                .collection
                (planetName + '/explorers/entries/' + planetExplorer.userId + '/quests/' + newInProgressQuest.questId + '/comments/',
                  ref => ref.where('timestamp', '>', newInProgressQuest.comment_last_view_date))
                .get()
                .subscribe(newComments => {
                  if (newComments.size > 0) {
                    if (explorersWithNewCommentsIds.indexOf(planetExplorer.userId) === -1) {
                      explorersWithNewCommentsIds.push(planetExplorer.userId);

                      explorersWithNewCommentsArray.push(this.createExplorerWithNewComments(planetExplorer));
                    }
                  }
                });
            });
          }
        });
    });
    this.store.dispatch(new actions.GetExplorersWithNewCommentsSuccess(explorersWithNewCommentsArray));
  }
}
