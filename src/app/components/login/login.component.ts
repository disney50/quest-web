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
    private globalService: GlobalService) {}

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
      this.signInExistingUser();
    }
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
          this.globalService.setSignedInUser(this.existingUser);
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
      this.existingUserPlanet = planetState.currentPlanet;
      this.globalService.setCurrentPlanet(this.existingUserPlanet);
    });

    this.navigateDashboard(); 
  }

}
