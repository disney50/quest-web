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
  explorerQuestsIds: string[] = [];
  posssibleQuest: Quest = {} as Quest;
  possibleQuests: Quest[] = []
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

  getPossibleQuests(planetQuests: Quest[], explorerQuests: Quest[], planetName: string, userId: string): Quest[] { 
    planetQuests.forEach(planetQuest => {
      if(this.planetQuestsIds.indexOf(planetQuest.questId) === -1) {
        this.planetQuestsIds.push(planetQuest.questId);
      }
    });     
        
    explorerQuests.forEach(explorerQuest => {
      if(this.explorerQuestsIds.indexOf(explorerQuest.questId) === -1) {
        this.explorerQuestsIds.push(explorerQuest.questId);
      }
    });

    this.planetQuestsIds.forEach(planetQuestId => {      
      if(this.explorerQuestsIds.indexOf(planetQuestId) === -1) {
        this.posssibleQuest = planetQuests.find(function(planetQuest) { 
          return planetQuest.questId === planetQuestId; 
        });        

        if(this.possibleQuests.indexOf(this.posssibleQuest) === -1) {
          this.possibleQuests.push(this.posssibleQuest);          
        }
      }
    });

    return this.possibleQuests;
  }
}
