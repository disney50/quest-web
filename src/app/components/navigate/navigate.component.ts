import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {

  user: User;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new actions.GetUser);

    this.store.select("user").subscribe(userState => {
      this.user = userState.user;
      console.log(this.user);
    })
  }
}
