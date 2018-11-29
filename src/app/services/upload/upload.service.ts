import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  uploadFile(selectedFile: File, planetName: string, userId: string, questId: string) {    
    const storageRef = firebase.storage().ref();
    
    const uploadTask = storageRef.child(planetName + "/" + userId + "/" + questId + "/" + selectedFile.name + "/").put(selectedFile);
  }
}
