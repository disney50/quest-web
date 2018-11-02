import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dropdownClicked: boolean = false;

  constructor(public globalService: GlobalService,
    private store: Store<AppState>) {}

  ngOnInit() {}

  logOutUser() {
    this.globalService.removeSignedInUser();
    
    this.store.dispatch(new actions.LogOutUser);
  }

  removeCurrentPlanet() {
    this.globalService.removeCurrentPlanet();
    this.store.dispatch(new actions.LogOutUser);
  }

  removeCurrentExplorer() {

  }
}
