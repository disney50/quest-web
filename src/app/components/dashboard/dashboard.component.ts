import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions';
import { User } from 'src/app/models/user';
import * as selectors from '../../store/selectors/user.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  signedInUser: User = {} as User;

  constructor(public globalService: GlobalService,
    private store: Store<AppState>) {}

  logOutClicked() {
    this.store.dispatch(new actions.LogOutUser);
  }

  sliceSignedInUser() {
    this.store.select(selectors.signedInUser).subscribe(signedInUser => {
      if(signedInUser) {
        console.log(signedInUser);
        this.signedInUser = signedInUser;
      }
    })
  }

  ngOnInit() {
    this.sliceSignedInUser();
  }
}
