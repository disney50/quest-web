import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions';
import { User } from 'src/app/models/user';
import * as selectors from '../../store/selectors';
import { Planet } from 'src/app/models/planet';
import { Explorer } from 'src/app/models/explorer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  signedInUser: User = {} as User;
  currentPlanet: Planet = {} as Planet;
  currentExplorer: Explorer = {} as Explorer;


  constructor(public globalService: GlobalService,
    private store: Store<AppState>) {}

  logOutClicked() {
    this.store.dispatch(new actions.LogOutUser);
  }

  sliceSignedInUser() {
    this.store.select(selectors.signedInUser).subscribe(signedInUser => {
      if(signedInUser) {
        this.signedInUser = signedInUser;
        this.globalService.setSignedInUser(this.signedInUser);
        this.store.dispatch(new actions.RequestGetDefaultPlanet);
      }
    })
  }

  sliceCurrentPlanet() {
    this.store.select(selectors.currentPlanet).subscribe(currentPlanet => {
      if(currentPlanet) {               
        this.currentPlanet = currentPlanet;
        this.globalService.setCurrentPlanet(this.currentPlanet);
        this.store.dispatch(new actions.RequestGetExplorer);
      }
    })
  }

  sliceCurrentExplorer() {
    this.store.select(selectors.currentExplorer).subscribe(currentExplorer => {
      if(currentExplorer) {
        this.currentExplorer = currentExplorer;        
      }
    })
  }

  ngOnInit() {
    this.sliceSignedInUser();
    this.sliceCurrentPlanet();
    this.sliceCurrentExplorer();
  }
}
