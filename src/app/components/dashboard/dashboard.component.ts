import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dropdownClicked: boolean = false;

  constructor(public globalService: GlobalService,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  logOutClicked() {
    this.authenticationService.logOutUser();
  }
}
