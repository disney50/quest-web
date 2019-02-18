import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Upload } from 'src/app/models/upload';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  upload: Upload = {} as Upload;

  constructor(private angularFirestore: AngularFirestore) { }

  uploadFileToStorage(selectedFile: File, planetName: string, userId: string, questId: string) {
    this.upload.name = selectedFile.name;

    const storageRef = firebase.storage().ref();

    const uploadTask = storageRef.child(planetName + '/' + userId + '/' + questId + '/' + selectedFile.name + '/').put(selectedFile);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (error) => {
      console.log(error);
    });

    this.addDocumentForUpload(planetName, userId, questId);
  }

  addDocumentForUpload(planetName: string, userId: string, questId: string) {
    this.upload.timestamp = firebase.firestore.Timestamp.now();

    this.getCollectionForUpload(planetName, userId, questId).add(this.upload);
  }

  getCollectionForUpload(planetName: string, userId: string, questId: string): AngularFirestoreCollection {
    return this.angularFirestore.collection(planetName + '/explorers/entries/' + userId + '/quests/' + questId + '/files/');
  }

  downloadFileFromStorage(planetName: string, userId: string, questId: string, selectedFileName: string): Promise<any> {
    const storageRef = firebase.storage().ref();

    return storageRef.child(planetName + '/' + userId + '/' + questId + '/' + selectedFileName).getDownloadURL();
  }
}
