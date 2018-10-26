import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions';
import { Planet } from 'src/app/models/planet';
import { GlobalService } from 'src/app/services/global/global.service';
import { PlanetService } from 'src/app/services/planet/planet.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  maleStatus: boolean = true;
  femaleStatus: boolean = false;
  newUser: User = {} as User;
  planets: Planet[];

  constructor(private userService: UserService, 
    private globalService: GlobalService,
    private planetService: PlanetService,
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore) {

    this.store.dispatch(new actions.RequestGetPlanets,);

    this.store.select("planet").subscribe(planetState => {
      this.planets = planetState.planets;            
    })
   }

  ngOnInit() {
  }

  maleClickEvent() {
    this.maleStatus = true;
    this.femaleStatus = false;  
  }

  femaleClickEvent() {
    this.maleStatus = false;
    this.femaleStatus = true;
  }

  checkNewUserGender() {
    if(this.maleStatus == true) {
      this.newUser.gender = "MALE";
    }
    else {
      this.newUser.gender = "FEMALE";
    }
    return this.newUser;
  }

  registerNewUser(selectedPlanet: Planet): void {
    const newUserId = this.angularFirestore.createId();
    this.newUser.userId = newUserId;

    this.checkNewUserGender();

    this.globalService.setSignedInUser(this.newUser);

    this.userService.registerNewUser(this.globalService.signedInUser);
    
    this.globalService.setCurrentPlanet(selectedPlanet);
  
    this.planetService.addNewUserPlanet(this.globalService.signedInUser, this.globalService.currentPlanet);

    this.newUser = {} as User;
    this.maleClickEvent();
  }

}