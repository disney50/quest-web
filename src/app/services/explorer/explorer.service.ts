import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Explorer } from 'src/app/models/explorer';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  newExplorer: Explorer = {} as Explorer;


  constructor(private angularFirestore: AngularFirestore, 
    private globalService: GlobalService) {
  }

  createNewExplorer() {    
    this.newExplorer.name = this.globalService.signedInUser.name;
    this.newExplorer.surname = this.globalService.signedInUser.surname;
    this.newExplorer.xp = "0";
    this.newExplorer.userId = this.globalService.signedInUser.userId;
    this.addNewExplorer();
  }

  addNewExplorer() {
    this.angularFirestore.collection(this.globalService.currentPlanet.name + "/explorers/entries").doc(this.newExplorer.userId).set(this.newExplorer);
  }
}
