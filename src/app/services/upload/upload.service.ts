import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Upload } from 'src/app/models/upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  upload: Upload = {} as Upload;

  constructor(private angularFirestore: AngularFirestore) { }

  uploadFileToStorage(selectedFile: File, planetName: string, userId: string, questId: string) { 
    console.log(selectedFile);
    
    this.upload.name = selectedFile.name;
    console.log(this.upload);
    
    
    const storageRef = firebase.storage().ref();
    
    const uploadTask = storageRef.child(planetName + "/" + userId + "/" + questId + "/" + selectedFile.name + "/").put(selectedFile);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (error) => {
      console.log(error);
    });

    this.createFirestoreDocumentForUploadedFile(planetName, userId, questId);
  }

  createFirestoreDocumentForUploadedFile(planetName: string, userId: string, questId: string) {
    this.upload.timestamp = firebase.firestore.Timestamp.now();
    console.log(this.upload);
    

    this.angularFirestore.collection(planetName + "/explorers/entries/" + userId + "/quests/" + questId + "/files/").add(this.upload);
  }
}
