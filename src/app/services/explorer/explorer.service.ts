import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Explorer } from 'src/app/models/explorer';
import { User } from 'src/app/models/user';
import { Quest, QuestData } from 'src/app/models/quest';
import { Comment, CommentData } from 'src/app/models/comment';
import { QuestService } from '../quest/quest.service';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  newExplorer: Explorer = {} as Explorer;

  constructor(private angularFirestore: AngularFirestore,
    private questService: QuestService
  ) { }

  createExplorer(planetName: string, newUser: User) {
    this.newExplorer.name = newUser.name;
    this.newExplorer.surname = newUser.surname;
    this.newExplorer.xp = '0';
    this.newExplorer.userId = newUser.userId;
    this.addNewExplorerToPlanet(planetName);
  }

  addNewExplorerToPlanet(planetName: string) {
    this.angularFirestore.collection(planetName + '/explorers/entries').doc(this.newExplorer.userId).set(this.newExplorer);
  }

  getModeratingQuestsAndnewCommentsNumber(planetName: string, planetExplorers: Explorer[]) {
    planetExplorers.forEach(planetExplorer => {
      this.angularFirestore.collection(planetName + '/explorers/entries/' + planetExplorer.userId + '/quests/')
        .get().subscribe(documents => {
          planetExplorer.moderatingQuests = 0;
          planetExplorer.questsWithNewComments = 0;
          documents.forEach(document => {
            let explorerQuest = {} as Quest;
            let explorerQuests = [];
            explorerQuest = new Quest(document.id, document.data() as QuestData);
            explorerQuests.push(explorerQuest);

            if (explorerQuest.status === 'moderating') {
              planetExplorer.moderatingQuests = planetExplorer.moderatingQuests + 1;
            }

            let newExplorerQuests = [];
            newExplorerQuests = this.questService.getNumberNewCommentsForQuest(planetName, planetExplorer.userId, explorerQuests);
            newExplorerQuests.forEach(newExplorerQuest => {
              if (newExplorerQuest.newComments > 0) {
                planetExplorer.questsWithNewComments = planetExplorer.questsWithNewComments + 1;
              }
            });
          });
        });
    });

    return planetExplorers;
  }
}
