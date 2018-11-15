import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions/';
import * as selectors from '../../store/selectors/';
import { LoginDetails } from 'src/app/models/login-details';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string = null;

  constructor(private router: Router,
    private store: Store<AppState>) { 

  }

  navigateRegister() {
    this.router.navigateByUrl("register");
  }

  signInClicked(email: string, password: string) {

    if (!email || !password) {
      this.message = "You forgot to fill in some fields";
    }
    else {
      this.store.dispatch(new actions.RequestLoginUserExist({email: email, password: password} as LoginDetails));
    }
  }

  navigateDashboard() {
    this.router.navigateByUrl("dashboard");
  }

  sliceHasLoginFailed() {
    this.store.select(selectors.hasLoginFailed).subscribe(hasFailed => {
      if(hasFailed)
        this.message = "Incorrect email or password";
    });
  }

  sliceHasLoginSucceeded() {
    this.store.select(selectors.hasLoginSucceeded).subscribe(signedIn => {
      if(signedIn) {
        this.navigateDashboard();
      }
    })
  }

  ngOnInit() {
    this.sliceHasLoginFailed();
    this.sliceHasLoginSucceeded();
   }

}
