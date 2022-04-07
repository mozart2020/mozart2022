import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { AuthService } from './auth.service';
import { 
  arrayUnion, 
  collection, 
  collectionData, 
  doc,
  addDoc,
  Firestore, 
  updateDoc, 
  docData, 
  query, 
  where, 
  documentId,
  serverTimestamp
} from '@angular/fire/firestore';
import { orderBy } from 'firebase/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';

export interface VideoInfo {
  date: string;
  title: string; 
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  public videos = [];
  justAddedVideoID: string;

  constructor(
    private loadingCtrl: LoadingController,
    private firestore: Firestore,
    private storage: Storage,
    private auth: AuthService
  ) { }

  async storeVideo(blob) {
    const fileName = new Date().getTime() + '.mp4';
    const base64Data = await this.convertBlobToBase64(blob) as string;
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });
    // Replace file in array
    this.videos = [];
    this.videos.unshift(savedFile.uri);
    console.log('MY Video Array: ', this.videos);    
  }
  // Helper functions
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);    
  });
  async getVideoBase64Url(fullPath) {
    const path = fullPath.substr(fullPath.lastIndexOf('/') + 1);
    const file = await Filesystem.readFile({
      path: path,
      directory: Directory.Data
    });
    console.log('inside getVideoBase64Url: ', file.data);
    return `data:video/mp4;base64,${file.data}`;
  }
  async getVideoDuration(fullPath) {
    const path = fullPath.substr(fullPath.lastIndexOf('/') + 1);
    const file = await Filesystem.readFile({
      path: path,
      directory: Directory.Data
    });
    return `data:video/mp4;base64,${file.data}`;
  }

  //Firebase section:
  addVideo(title, notes, length) {
    const userId = this.auth.getCurrentUserId();
    const videosRef = collection(this.firestore, `users/${userId}/videos`);
    return addDoc(videosRef, { 
      date: serverTimestamp(),
      title,
      notes,
      length
    }).then(res => {
      this.justAddedVideoID = res.id;
      console.log('just created this id for added video: ', this.justAddedVideoID)
    })
  }
  updateVideoUrl(videoUrl) {
    const userId = this.auth.getCurrentUserId();
    const videoId = this.justAddedVideoID;
    const videoDocRef = doc(this.firestore, `users/${userId}/videos/${videoId}`);
    return updateDoc(videoDocRef, { 
      videoUrl
    });
  }
  getVideos() {
    const userId = this.auth.getCurrentUserId();
    const videosRef = collection(this.firestore, `users/${userId}/videos`);
    const q = query(videosRef, orderBy('date'));
    return collectionData(q, { idField: 'id' });
  }
  getVideoById(id) {
    const userId = this.auth.getCurrentUserId();
    const videoDocRef = doc(this.firestore, `users/${userId}/videos/${id}`);
    return docData(videoDocRef, { idField: 'id' });
  }
  ///////////// IMAGE SECTION ///////////////////
  async addImageMsg(base64, connectionId) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading...',
    });
    await loading.present();
    const userId = this.auth.getCurrentUserId();
    const imageName = `${new Date().getTime()}_${userId}.jpeg`;
    console.log('image name: ', imageName);
    const storageRef = ref(this.storage, imageName);
    const uploadResult = await uploadString(storageRef, base64, 'base64',{
      contentType: 'image/jpeg'
    });
    if (uploadResult) {loading.dismiss();};
    const url = await getDownloadURL(uploadResult.ref);
    const messagesRef = collection(this.firestore, `connections/${connectionId}/messages`);
   return addDoc(messagesRef, {
      from: userId,
      file: url,
      createdAt: serverTimestamp() });
  }


  
}
