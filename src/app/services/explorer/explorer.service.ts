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
    let newExplorerRequiringModeratorAction = {} as ExplorerRequiringModeratorAction;
    newExplorerRequiringModeratorAction.isModerating = false;
    newExplorerRequiringModeratorAction.name = planetExplorer.name;
    newExplorerRequiringModeratorAction.newComments = false;
    newExplorerRequiringModeratorAction.surname = planetExplorer.surname;
    newExplorerRequiringModeratorAction.userId = planetExplorer.userId;
    newExplorerRequiringModeratorAction.xp = planetExplorer.xp;
    return newExplorerRequiringModeratorAction;
  }

  createExplorersRequiringModeratorActionArray(planetExplorers: Explorer[], planetName: string) {
    let explorersRequiringModeratorAction = [];

    planetExplorers.forEach(planetExplorer => {
      let newExplorerRequiringModeratorAction = this.createExplorerRequiringModeratorAction(planetExplorer);
      this.angularFirestore.collection(planetName + '/explorers/entries/' + planetExplorer.userId + '/quests/')
        .get().subscribe(documents => {
          documents.forEach(document => {
            let quest = {} as Quest;
            quest = new Quest(document.id, document.data() as QuestData);
            if (quest.status === 'moderating' && newExplorerRequiringModeratorAction.isModerating === false) {
              newExplorerRequiringModeratorAction.isModerating = true;
            }

            this.angularFirestore
              .collection(planetName + '/explorers/entries/' + planetExplorer.userId + '/quests/' + quest.questId + '/comments/')
              .get().subscribe(documents => {
                documents.forEach(document => {
                  let comment = {} as Comment;
                  comment = new Comment(document.data() as CommentData);
                  if (comment.timestamp > quest.comment_last_view_date && newExplorerRequiringModeratorAction.newComments === false) {
                    newExplorerRequiringModeratorAction.newComments = true;
                  }
                });
              });
          });
        });
      explorersRequiringModeratorAction.push(newExplorerRequiringModeratorAction);
    });
    this.store.dispatch(new actions.GetExplorersRequiringModeratorActionSuccess(explorersRequiringModeratorAction));
  }
}
