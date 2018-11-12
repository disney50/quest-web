import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Explorer } from 'src/app/models/explorer';
import { Observable } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  explorers$: Observable<any>;
  explorerCollecton: AngularFirestoreCollection<Explorer>;
  newExplorer: Explorer = {} as Explorer;


  constructor(private angularFirestore: AngularFirestore, 
    private globalService: GlobalService,
    private store: Store<AppState>) {
  }

  createNewExplorer() {
    this.newExplorer.name = this.globalService.signedInUser.name;
    this.newExplorer.surname = this.globalService.signedInUser.surname;
    this.newExplorer.xp = "0";
    this.newExplorer.userId = this.globalService.signedInUser.userId;
    this.addNewPlanetExplorer();
  }

  addNewPlanetExplorer() {
    this.angularFirestore.collection<Explorer>(this.globalService.currentPlanet.name + "/explorers/entries")
    .doc(this.newExplorer.userId).set(this.newExplorer);

    this.globalService.setCurrentExplorer(this.newExplorer);
    
    this.getCurrentExplorer();
  }

  getCurrentExplorer() {
    this.store.dispatch(new actions.RequestGetCurrentExplorer);

    this.store.select("explorer").subscribe(explorerState => {
      this.globalService.setCurrentExplorer(explorerState.currentExplorer);
    });
  }
}
