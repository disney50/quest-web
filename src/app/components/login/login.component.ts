import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions';
import { LoginDetails } from 'src/app/models/login-details';
import * as selectors from '../../store/selectors';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string = null;
  moderatorSignedIn = false;
  userSignedIn = false;

  constructor(private router: Router,
    private store: Store<AppState>) {

  }

  navigateRegister() {
    this.router.navigateByUrl('register');
  }

  navigateDashboard() {
    this.router.navigateByUrl('dashboard');
  }

  signInClicked(email: string, password: string) {
    if (!email || !password) {
      this.message = 'You forgot to fill in some fields';
    } else {
      if (email === 'moderator') {
        this.store.dispatch(new actions.RequestGetModeratorByLoginDetails({ email: email, password: password } as LoginDetails));
      } else {
        this.store.dispatch(new actions.RequestUserExistsUsers({ email: email, password: password } as LoginDetails));
      }
    }
  }

  sliceHasLoginFailed() {
    this.store.select(selectors.loginFailed).subscribe(loginFailed => {
      if (loginFailed) {
        this.message = 'Incorrect email or password';
      }
    });
  }

  // sliceHasLoginSucceeded() {
  //   this.store.select(selectors.moderatorSignedIn).subscribe(moderatorSignedIn => {
  //     if (moderatorSignedIn) {
  //       this.navigateDashboard();
  //     }
  //   });

  //   this.store.select(selectors.userSignedIn).subscribe(userSignedIn => {
  //     if (userSignedIn) {
  //       this.navigateDashboard();
  //     }
  //   });
  // }

  sliceHasLoginSucceeded() {
    combineLatest(
      this.store.select(selectors.moderatorSignedIn),
      this.store.select(selectors.userSignedIn)
    ).subscribe(combinedValue => {
      this.moderatorSignedIn = combinedValue[0];
      this.userSignedIn = combinedValue[1];
      if (this.moderatorSignedIn || this.userSignedIn) {
        this.navigateDashboard();
      }
    });
  }

  ngOnInit() {
    this.sliceHasLoginFailed();
    this.sliceHasLoginSucceeded();
  }

}
