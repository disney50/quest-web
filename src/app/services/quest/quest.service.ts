import { Injectable } from '@angular/core';
import { Quest } from 'src/app/models/quest';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(private angularFirestore: AngularFirestore) { }

  submitQuest(planetName: string, userId: string, currentQuest: Quest) {
    currentQuest.status = "moderating";
    console.log(currentQuest);
    

    this.angularFirestore.collection(planetName + "/explorers/entries/" + userId + "/quests/").doc(currentQuest.questId).update(currentQuest.toData());
  }
}
