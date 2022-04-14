import { Injectable } from '@angular/core';
import { 
  collection, 
  collectionData, 
  doc,
  addDoc,
  Firestore, 
  updateDoc, 
  docData, 
  query, 
  where,
  orderBy,
  serverTimestamp
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(
    private firestore: Firestore
  ) { }

  addLesson(videoId: string, connectionId: string) {
    const lessonsRef = collection(this.firestore, 'lessons');
    return addDoc(lessonsRef, {
      createdAt: serverTimestamp(),
      connectionId: connectionId,
      status: 'requested',
      videoId: videoId,
      numberOfFeedbacks: 0
    });
  }
}
