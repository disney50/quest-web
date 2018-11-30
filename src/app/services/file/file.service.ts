import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private angularFirestore: AngularFirestore) { }

  uploadFileToStorage(selectedFile: File, planetName: string, userId: string, questId: string) {    
    const storageRef = firebase.storage().ref();
    
    const uploadTask = storageRef.child(planetName + "/" + userId + "/" + questId + "/" + selectedFile.name + "/").put(selectedFile);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (error) => {
      console.log(error);
    })
  }

  createFirestoreDocumentForUploadedFile() {

  }
}
