import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import * as actions from '../../store/actions';
import { GlobalService } from 'src/app/services/global/global.service';
import { Planet } from 'src/app/models/planet';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  existingUser: User = {} as User;
  existingUserPlanet: Planet = {} as Planet;
  message: string = null;
  userCollection: AngularFirestoreCollection;
  users: User[];

  constructor(private router: Router, 
    private store: Store<AppState>, 
    private globalService: GlobalService,
    private angularFirestore: AngularFirestore) {}

  ngOnInit() {}

  navigateRegister() {
    this.router.navigateByUrl("register");
  }

  navigateDashboard() {
    this.router.navigateByUrl("dashboard");
  }

  checkEmailAndPassWordFields() {
    if (this.existingUser.email == null) {
      this.message = "No email entered"
    }
    else if (this.existingUser.password == null) {
      this.message = "No password entered"
    }
    else {
      this.globalService.setEmailAndPassword(this.existingUser);
      this.checkUserExists();
    }
  }

  checkUserExists() {
    this.angularFirestore.collection('users', ref => ref.where('email', "==", this.existingUser.email).where('password', '==', this.existingUser.password)).stateChanges().forEach(res => {
      if (res.length > 0) {
        this.signInExistingUser();
      }
      else {
      this.message = "Incorrect email or password entered"
      }
  });
  }

  signInExistingUser() {
      this.store.dispatch(new actions.RequestGetExistingUser);

      this.store.select("user").subscribe(userState =>{                
        if(userState.signedInUser != {} as User) {          
          this.existingUser.email = userState.signedInUser.email;
          this.existingUser.gender = userState.signedInUser.gender;
          this.existingUser.name = userState.signedInUser.name;
          this.existingUser.password = userState.signedInUser.password;
          this.existingUser.surname = userState.signedInUser.surname;
          this.existingUser.userId = userState.signedInUser.userId;
          this.globalService.signedInUser = this.existingUser;
          
          this.getExistingUserPlanet();
        }
        else {
          this.message = "Incorrect email or password entered"
        }
      });    
  }

  getExistingUserPlanet() {
    this.store.dispatch(new actions.RequestGetUserPlanet);

    this.store.select("planet").subscribe(planetState => {      
      this.existingUserPlanet.name = planetState.currentPlanet.name;
      this.existingUserPlanet.description = planetState.currentPlanet.description;

      this.globalService.currentPlanet = this.existingUserPlanet;      
    });

    this.getPlanetExlorer(); 
  }

  getPlanetExlorer() {
    this.store.dispatch(new actions.RequestGetCurrentExplorer);

    this.store.select("explorer").subscribe(explorerState => {
      console.log("select", explorerState.currentExplorer);
      
      this.globalService.currentExplorer.name = explorerState.currentExplorer.name;
      this.globalService.currentExplorer.surname = explorerState.currentExplorer.surname;      
      this.globalService.currentExplorer.xp = explorerState.currentExplorer.xp;      
      this.globalService.currentExplorer.userId = explorerState.currentExplorer.userId;
    });

    this.navigateDashboard();
  }

}
