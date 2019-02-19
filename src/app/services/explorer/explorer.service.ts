import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Explorer } from 'src/app/models/explorer';
import { User } from 'src/app/models/user';
import { Quest, QuestData } from 'src/app/models/quest';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  newExplorer: Explorer = {} as Explorer;

  constructor(private angularFirestore: AngularFirestore) {

  }

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

  getNumberModeratingQuestsForExplorer(planetName: string, planetExplorers: Explorer[]) {
    planetExplorers.forEach(planetExplorer => {
      this.angularFirestore.collection(planetName + '/explorers/entries/' + planetExplorer.userId + '/quests/')
        .get().subscribe(documents => {
          planetExplorer.moderatingQuests = 0;
          documents.forEach(document => {
            let quest = {} as Quest;
            quest = new Quest(document.id, document.data() as QuestData);
            if (quest.status === 'moderating') {
              planetExplorer.moderatingQuests = planetExplorer.moderatingQuests + 1;
            }
          });
        });
    });

    return planetExplorers;
  }
}
