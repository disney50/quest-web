import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { Router } from '@angular/router';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { Planet } from 'src/app/models/planet';
import { User } from 'src/app/models/user';
import { Quest } from 'src/app/models/quest';

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
  availableQuests: Quest[];
  keys: string[];

  constructor(private store: Store<AppState>,
    private router: Router) { 
      
  }

  logOutClicked() {
    this.store.dispatch(new actions.LogOutUser);
  }

  navigateLogin() {
    this.router.navigateByUrl("login");
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
        this.store.dispatch(new actions.RequestGetInteractedQuests(this.currentPlanet.name, this.signedInUser.userId));        
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
        
        this.availableQuests = this.planetQuests.filter( function( item ){
          return interactedQuests.filter( function( item2 ){
            return item.questId == item2.questId;
          }).length == 0;
        });        
      }
    })
  }

  ngOnInit() {
    this.sliceHasLoginSucceeded();
    this.sliceSignedInUser();
    this.sliceCurrentPlanet();
    this.slicePlanetQuests();
    this.sliceInteractedQuests();
  }

}
