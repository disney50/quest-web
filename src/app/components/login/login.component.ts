import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import * as actions from '../../store/actions';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {} as User;
  message: string = null;
  userCollection: AngularFirestoreCollection;
  users: User[];

  constructor(private router: Router, 
    private store: Store<AppState>, 
    private globalService: GlobalService) { }

  ngOnInit() { 
    
  }

  navigateRegister() {
    this.router.navigateByUrl("register");
  }

  navigateDashboard() {
    this.router.navigateByUrl("dashboard");
  }

  signIn() {
    if (this.user.email == null) {
      this.message = "No email entered"
    }
    else if (this.user.password == null) {
      this.message = "No password entered"
    }
    else {
      this.globalService.setEmailAndPassword(this.user);

      this.store.dispatch(new actions.RequestUserSignIn);

      this.store.select("user").subscribe(userState =>{
        this.users = userState.users;
        if(this.users.length != 0) {
          this.user.email = this.users[0].email;
          this.user.gender = this.users[0].gender;
          this.user.name = this.users[0].name;
          this.user.password = this.users[0].password;
          this.user.surname = this.users[0].surname;
          this.user.userId = this.users[0].userId;
          this.globalService.setSignedInUser(this.user);
          this.navigateDashboard();   
        }
        else {
          this.message = "Incorrect email or password entered"
        }
      });    
    }
  }

}
