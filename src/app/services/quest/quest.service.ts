import { Injectable } from '@angular/core';
import { Quest, QuestData } from 'src/app/models/quest';
import { AngularFirestore } from '@angular/fire/firestore';
import { Planet } from 'src/app/models/planet';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  planetQuestsIds: string[] = [];
  interactedQuestsIds: string[] = [];
  availableQuest: Quest = {} as Quest;
  availableQuests: Quest[] = []
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

  checkIfPrerequisiteQuestCompleted(planetName: string, userId: string, possibleQuest: Quest): boolean {  
    this.prerequisiteQuest = {} as Quest; 

    this.angularFirestore.collection(planetName + "/explorers/entries/" + userId + "/quests/")
      .doc(possibleQuest.prerequisites[0]).ref.onSnapshot(snapShot => {
        if(snapShot.exists) {
          this.prerequisiteQuest = new Quest(snapShot.id, snapShot.data() as QuestData);
          if(this.prerequisiteQuest.status == "completed") {
            possibleQuest.isAvailable = true;            
          }
          else {
            possibleQuest.isAvailable = false;
          }   
        }
        else {
          possibleQuest.isAvailable = true;
        }
    });

    return possibleQuest.isAvailable;
  }

  getAvailableQuests(planetQuests: Quest[], interactedQuests: Quest[], planetName: string, userId: string): Quest[] { 
    planetQuests.forEach(planetQuest => {
      if(this.planetQuestsIds.indexOf(planetQuest.questId) === -1) {
        this.planetQuestsIds.push(planetQuest.questId);
      }
    });     
        
    interactedQuests.forEach(interactedQuest => {
      if(this.interactedQuestsIds.indexOf(interactedQuest.questId) === -1) {
        this.interactedQuestsIds.push(interactedQuest.questId);
      }
    });

    this.planetQuestsIds.forEach(planetQuestId => {      
      if(this.interactedQuestsIds.indexOf(planetQuestId) === -1) {
        this.availableQuest = planetQuests.find(function(planetQuest) { 
          return planetQuest.questId === planetQuestId; 
        });        

        if(this.availableQuests.indexOf(this.availableQuest) === -1) {
          this.availableQuests.push(this.availableQuest);          
        }
      }
    });

    this.availableQuests.forEach(possibleQuest => {          
      if(possibleQuest.prerequisites.length != 0) {
        possibleQuest.isAvailable = this.checkIfPrerequisiteQuestCompleted(planetName, userId, possibleQuest);
      }
      else {
        possibleQuest.isAvailable = true;
      }
    });

    return this.availableQuests;
  }
}
