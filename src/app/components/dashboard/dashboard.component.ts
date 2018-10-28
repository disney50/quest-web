import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public globalService: GlobalService) { }

  ngOnInit() {
  }

}
