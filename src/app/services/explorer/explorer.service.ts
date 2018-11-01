import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { Explorer, ExplorerData } from 'src/app/models/explorer';
import { Observable } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  explorers$: Observable<any>;
  explorerCollecton: AngularFirestoreCollection<Explorer>;

  constructor(private angularFirestore: AngularFirestore, 
    private globalService: GlobalService) {      
  }

  createNewExplorer(user: User) {
    this.explorerCollecton = this.angularFirestore.collection<Explorer>(this.globalService.currentPlanet.name + "/explorers/entries");
    const newExplorer: Explorer = {} as Explorer;
    newExplorer.name = user.name;
    newExplorer.surname = user.surname;
    newExplorer.xp = "0";
    newExplorer.userId = user.userId;
    this.addNewPlanetExplorer(newExplorer, user);
    return newExplorer;
  }

  addNewPlanetExplorer(newExplorer: Explorer, user: User) {
    this.explorerCollecton.doc(user.userId).set(newExplorer);    
  }
}
