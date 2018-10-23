import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public authenticationState = null;
  user: User;
  firebaseUserId: string;

  constructor(private store: Store<AppState>, private authService: AuthService, private router: Router, private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.authenticationState = user;
        this.firebaseUserId = user.uid;
        console.log(this.firebaseUserId);
      } 
      else {
        this.authenticationState = null;
      }

      if (this.authenticationState != null) {
        console.log("SSSS");
        
        this.store.dispatch(new actions.RequestGetUser(this.firebaseUserId));
        this.router.navigateByUrl('/dashboard');
      }
    });


    this.store.select("user").subscribe(userState => {
      this.user = userState.user;
      console.log(this.user);
    })
  }

  signIn() {
    this.authService.googleSignIn().then(() => {
      this.router.navigateByUrl('/dashboard');
    })
  }

}
