import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { Router } from '@angular/router';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { Planet } from 'src/app/models/planet';
import { User } from 'src/app/models/user';
import { Quest, QuestData } from 'src/app/models/quest';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.css']
})
export class QuestsComponent implements OnInit {
  signedInUser: User = {} as User;
  currentPlanet: Planet = {} as Planet;
  signedIn: boolean = false;
  planetQuests: Quest[];
  interactedQuests: Quest[];
  availableQuests: Quest[] = [];
  availableQuest: Quest = {} as Quest;
  planetQuestsIds: string[] = [];
  interactedQuestsIds: string[] = [];
  prerequisiteQuest: Quest = {} as Quest;

  constructor(private store: Store<AppState>,
    private router: Router,
    private angularFirestore: AngularFirestore) { 

  }

  logOutClicked() {
    this.store.dispatch(new actions.LogOutUser);
  }

  navigateLogin() {
    this.router.navigateByUrl("login");
  }

  navigateQuest() {
    this.router.navigateByUrl("quest");
  }

  questClicked(selectedQuest: Quest) {     
    this.store.dispatch(new actions.GetSelectedQuest(selectedQuest));
    this.navigateQuest();        
  }

  getAvailableQuests() { 
    //get array of all planet quest ids
    this.planetQuests.forEach(planetQuest => {
      if(this.planetQuestsIds.indexOf(planetQuest.questId) === -1) {
        this.planetQuestsIds.push(planetQuest.questId);
      }
    });     
        
    //get array of all interacted quest ids
    this.interactedQuests.forEach(interactedQuest => {
      if(this.interactedQuestsIds.indexOf(interactedQuest.questId) === -1) {
        this.interactedQuestsIds.push(interactedQuest.questId);
      }
    });

    //for each planet quest id
    this.planetQuestsIds.forEach(planetQuestId => {      
      
      //if planet quest id not exists in array of interacted quest ids      
      if(this.interactedQuestsIds.indexOf(planetQuestId) === -1) {
        //get planet quest from planet quests using planet quest id
        this.availableQuest = this.planetQuests.find(function(planetQuest) { 
          return planetQuest.questId === planetQuestId; 
        });        

        //add planet quest to available quests
        if(this.availableQuests.indexOf(this.availableQuest) === -1) {
          this.availableQuests.push(this.availableQuest);          
        }
      }
    });
  }

  checkIfPrerequisiteQuestCompleted(possibleQuest: Quest) {  
    this.prerequisiteQuest = {} as Quest;    

    //get snapshot of prerequisite quest using prerequisite  quest id
    this.angularFirestore.collection(this.currentPlanet.name + "/explorers/entries/" + this.signedInUser.userId + "/quests/")
      .doc(possibleQuest.prerequisites[0]).ref.onSnapshot(snapShot => {
        
        //if prerequisite quest exists
        if(snapShot.exists) {
          this.prerequisiteQuest = new Quest(snapShot.id, snapShot.data() as QuestData);

          //if prerequisite quest is completed possible quest is available
          if(this.prerequisiteQuest.status == "completed") {
            possibleQuest.isAvailable = true;            
          }   
        }
    });
  }

  sliceHasLoginSucceeded() {
    this.store.select(selectors.hasLoginSucceeded).subscribe(signedIn => {
      if(!signedIn) {
        this.signedIn = false;
        this.navigateLogin();
      }
      else {
        this.signedIn = true;
      }
    });
  }

  sliceSignedInUser() {
    this.store.select(selectors.signedInUser).subscribe(signedInUser => {
      if(this.signedIn == true) {
        this.signedInUser = signedInUser;
      }  
    })
  }

  sliceCurrentPlanet() {
    this.store.select(selectors.currentPlanet).subscribe(currentPlanet => {
      if(this.signedIn == true) {       
        this.currentPlanet = currentPlanet;                
        this.store.dispatch(new actions.RequestGetPlanetQuests(this.currentPlanet.name));        
        this.store.dispatch(new actions.RequestInteractedQuestExists(this.currentPlanet.name, this.signedInUser.userId));        
      }  
    })
  }

  slicePlanetQuests() {
    this.store.select(selectors.planetQuests).subscribe(planetQuests => {
      if(this.signedIn == true) {                
        this.planetQuests = planetQuests;  
      }
    })
  }

  sliceInteractedQuests() {
    this.store.select(selectors.interactedQuests).subscribe(interactedQuests => {
      if(this.signedIn == true) {                
        this.interactedQuests = interactedQuests;
        this.getAvailableQuests();

        //for each possible quest
        this.availableQuests.forEach(possibleQuest => {          
          //if quest has prerequisites check if prerequisites are completed
          if(possibleQuest.prerequisites.length != 0) {
            this.checkIfPrerequisiteQuestCompleted(possibleQuest);
          }
          //if quest not has prerequisites quest is available
          else {
            possibleQuest.isAvailable = true;
          }
        });
      }
    })
  }

  sliceInteractedQuestExists() {
    this.store.select(selectors.interactedQuestExists).subscribe(interactedQuestExists => {   

    })
  }

  ngOnInit() {
    this.sliceHasLoginSucceeded();
    this.sliceSignedInUser();
    this.sliceCurrentPlanet();
    this.slicePlanetQuests();
    this.sliceInteractedQuests();
    this.sliceInteractedQuestExists();
  }

}
