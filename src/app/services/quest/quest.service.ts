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

  filterPrerequisiteQuests(planetName: string, userId: string, availableQuest: Quest) {  
    this.prerequisiteQuest = {} as Quest;

    this.angularFirestore.collection(planetName + "/explorers/entries/" + userId + "/quests/")
      .doc(availableQuest.prerequisites[0]).ref.onSnapshot(snapShot => {
        this.prerequisiteQuest = new Quest(snapShot.id, snapShot.data() as QuestData);

        if(this.prerequisiteQuest.status == "completed") {
          availableQuest.isAvailable = true;
        }     
    });
  }
}
