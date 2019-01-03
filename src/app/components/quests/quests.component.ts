import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { Router } from '@angular/router';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { Planet } from 'src/app/models/planet';
import { User } from 'src/app/models/user';
import { Quest } from 'src/app/models/quest';
import { QuestService } from 'src/app/services/quest/quest.service';
import { combineLatest } from 'rxjs';

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
  explorerQuests: Quest[];
  posssibleQuests: Quest[] = [];

  constructor(private store: Store<AppState>,
    private router: Router,
    private questService: QuestService) { 

  }

  navigateLogin() {
    this.router.navigateByUrl("login");
  }

  navigateQuest() {
    this.router.navigateByUrl("quest");
  }

  logOutClicked() {
    this.store.dispatch(new actions.LogOutUser);
  }

  questClicked(selectedQuest: Quest) {     
    this.store.dispatch(new actions.GetSelectedQuestSuccess(selectedQuest));
    this.navigateQuest();        
  }

  sliceHasLoginSucceeded() {
    this.store.select(selectors.hasLoginSucceeded).subscribe(signedIn => {
      if(!signedIn) {
        this.navigateLogin();
      }
      else {
        this.signedIn = true;
      }
    });
  }

  sliceSignedInUser() {
    this.store.select(selectors.signedInUser).subscribe(signedInUser => {
      if(this.signedIn) {
        this.signedInUser = signedInUser;
      }  
    })
  }

  sliceCurrentPlanet() {
    this.store.select(selectors.currentPlanet).subscribe(currentPlanet => {
      if(this.signedIn) {       
        this.currentPlanet = currentPlanet;                
        this.store.dispatch(new actions.RequestGetPlanetQuests(this.currentPlanet.name));        
        this.store.dispatch(new actions.RequestExplorerQuestsExist(this.currentPlanet.name, this.signedInUser.userId));        
      }  
    })
  }

  slicePlanetQuests() {
    this.store.select(selectors.planetQuests).subscribe(planetQuests => {
      this.planetQuests = planetQuests;  
      this.posssibleQuests = this.planetQuests;   
      this.sliceExplorerQuestsExist();     
    })
  }

  sliceExplorerQuestsExist() { 
    this.store.select(selectors.explorerQuestsExist).subscribe(explorerQuestsExist => {
      if(this.signedIn) {
        if(explorerQuestsExist) {
          this.sliceExplorerQuests();
        }
        else { 
          this.posssibleQuests.forEach(possibleQuest => {            
            possibleQuest.isAvailable = this.questService.checkIfPrerequisiteQuestCompleted(this.currentPlanet.name, this.signedInUser.userId, possibleQuest);
          });
        }
      }   
      
    })
  }

  sliceExplorerQuests() {
    this.store.select(selectors.explorerQuests).subscribe(explorerQuests => {
      if(this.signedIn) {                
        this.explorerQuests = explorerQuests;
        this.posssibleQuests = this.questService.getPossibleQuests(this.planetQuests, this.explorerQuests, this.currentPlanet.name, this.signedInUser.userId);
      }
    })
  }

  ngOnInit() {
    this.sliceHasLoginSucceeded();
    this.sliceSignedInUser();
    this.sliceCurrentPlanet();
    this.slicePlanetQuests();
    // this.sliceExplorerQuestsExist();
  }

}
