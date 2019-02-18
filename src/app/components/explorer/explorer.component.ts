import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { User } from 'src/app/models/user';
import { Planet } from 'src/app/models/planet';
import { Explorer } from 'src/app/models/explorer';
import { Quest } from 'src/app/models/quest';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {
  moderatorSignedIn = false;
  userSignedIn = false;
  signedInUser = {} as User;
  currentPlanet = {} as Planet;
  selectedExplorer = {} as Explorer;
  explorerQuests = [];

  constructor(private store: Store<AppState>,
    private router: Router
  ) { }

  navigateLogin() {
    this.router.navigateByUrl('login');
  }

  navigatDashboard() {
    this.router.navigateByUrl('dashboard');
  }

  questClicked(selectedQuest: Quest) {
    this.store.dispatch(new actions.GetSelectedQuestSuccess(selectedQuest));
    this.router.navigateByUrl('quest');
  }

  sliceHasLoginSucceeded() {
    combineLatest(
      this.store.select(selectors.moderatorSignedIn),
      this.store.select(selectors.userSignedIn)
    ).subscribe(combinedValue => {
      this.moderatorSignedIn = combinedValue[0];
      this.userSignedIn = combinedValue[1];
      if (!this.moderatorSignedIn && !this.userSignedIn) {
        this.navigateLogin();
      } else if (this.userSignedIn) {
        this.navigatDashboard();
      }
    });
  }

  sliceSignedInUser() {
    this.store.select(selectors.signedInUser).subscribe(signedInUser => {
      if (this.moderatorSignedIn) {
        this.signedInUser = signedInUser;
      }
    });
  }

  sliceCurrentPlanet() {
    this.store.select(selectors.currentPlanet).subscribe(currentPlanet => {
      if (this.moderatorSignedIn) {
        this.currentPlanet = currentPlanet;
      }
    });
  }

  sliceSelectedExplorer() {
    this.store.select(selectors.selectedExplorer).subscribe(selectedExplorer => {
      if (this.moderatorSignedIn) {
        this.selectedExplorer = selectedExplorer;
        this.store.dispatch(new actions.RequestGetExplorerQuests(this.currentPlanet.name, this.selectedExplorer.userId));
      }
    });
  }

  sliceExplorerQuests() {
    this.store.select(selectors.explorerQuests).subscribe(explorerQuests => {
      if (this.moderatorSignedIn) {
        this.explorerQuests = explorerQuests;
      }
    });
  }

  ngOnInit() {
    this.sliceHasLoginSucceeded();
    this.sliceSignedInUser();
    this.sliceCurrentPlanet();
    this.sliceSelectedExplorer();
    this.sliceExplorerQuests();
  }

}
