import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Planet } from 'src/app/models/planet';
import { Explorer } from 'src/app/models/explorer';
import { Quest } from 'src/app/models/quest';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { Router } from '@angular/router';

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

  constructor(private store: Store<AppState>, 
    private router: Router) { }

  logOutClicked() {
    this.store.dispatch(new actions.LogOutUser);
  }

  navigateLogin() {
    this.router.navigateByUrl("login");
  }

  sliceHasLoginSucceeded() {
    this.store.select(selectors.hasLoginSucceeded).subscribe(signedIn => {
      if(!signedIn) {
        this.navigateLogin();
      }
    });
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

  sliceCurrentQuest() {
    this.store.select(selectors.currentQuest).subscribe(currentQuest => {
      if(currentQuest) {
        this.currentQuest = currentQuest;
      }
    })
  }

  ngOnInit() {
    this.sliceHasLoginSucceeded();
    this.sliceSignedInUser();
    this.sliceCurrentPlanet();
    this.sliceCurrentExplorer();
    this.sliceCurrentQuest();
  }

}
