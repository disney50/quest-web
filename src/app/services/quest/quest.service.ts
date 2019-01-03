import { Injectable } from '@angular/core';
import { Quest, QuestData } from 'src/app/models/quest';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  prerequisiteQuest: Quest = {} as Quest;

  constructor(private angularFirestore: AngularFirestore) { }

  submitQuest(planetName: string, userId: string, currentQuest: Quest) {
    currentQuest.status = "moderating";    

    this.angularFirestore.collection(planetName + "/explorers/entries/" + userId + "/quests/").doc(currentQuest.questId).update(currentQuest.toData());
  }

  launchQuest(planetName: string, userId: string, currentQuest: Quest) {
    currentQuest.status = "in_progress";

    this.angularFirestore.collection(planetName + "/explorers/entries/" + userId + "/quests/").doc(currentQuest.questId).set(currentQuest.toData());
  }
}
