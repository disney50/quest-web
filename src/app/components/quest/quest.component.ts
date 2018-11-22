import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Planet } from 'src/app/models/planet';
import { Explorer } from 'src/app/models/explorer';
import { Quest } from 'src/app/models/quest';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})
export class QuestComponent implements OnInit {
  signedInUser: User = {} as User;
  currentPlanet: Planet = {} as Planet;
  currentExplorer: Explorer = {} as Explorer;
  currentQuest: Quest = {} as Quest;

  constructor(private store: Store<AppState>) { }

  logOutClicked() {
    this.store.dispatch(new actions.LogOutUser);
  }

  sliceSignedInUser() {
    this.store.select(selectors.signedInUser).subscribe(signedInUser => {
      if(signedInUser) {
        this.signedInUser = signedInUser;
        this.store.dispatch(new actions.RequestGetDefaultPlanet(this.signedInUser.userId));
      }
    })
  }

  sliceCurrentPlanet() {
    this.store.select(selectors.currentPlanet).subscribe(currentPlanet => {
      if(currentPlanet) {               
        this.currentPlanet = currentPlanet;
        this.store.dispatch(new actions.RequestGetExplorer(this.currentPlanet.name, this.signedInUser.userId));
      }
    })
  }

  sliceCurrentExplorer() {
    this.store.select(selectors.currentExplorer).subscribe(currentExplorer => {
      if(currentExplorer) {
        this.currentExplorer = currentExplorer;      
        this.store.dispatch(new actions.RequestInProgressQuestExists(this.currentPlanet.name, this.signedInUser.userId)); 
      }
    })
  }

  // sliceCurrentQuestExists() {
  //   this.store.select(selectors.currentQuestExists).subscribe(currentQuestExists => {
  //     if(currentQuestExists) {
  //       this.currentQuestExists = true;
  //     }
  //     else if(!currentQuestExists) {
  //       this.currentQuestExists = false;
  //     }
  //   })
  // }

  sliceCurrentQuest() {
    this.store.select(selectors.currentQuest).subscribe(currentQuest => {
      if(currentQuest) {
        this.currentQuest = currentQuest;
        // if(this.currentQuest.status == "in_progress") {
        //   this.status = "IN PROGRESS";
        // }
        // else if(this.currentQuest.status == "moderating") {
        //   this.status = "MODERATING";
        // }
      }
    })
  }

  ngOnInit() {
    this.sliceSignedInUser();
    this.sliceCurrentPlanet();
    this.sliceCurrentExplorer();
    // this.sliceCurrentQuestExists();
    this.sliceCurrentQuest();
  }

}
