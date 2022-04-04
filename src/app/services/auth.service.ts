import { Injectable } from '@angular/core';
import {
  Auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider
} from '@angular/fire/auth';
import { collection, doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserData = null;
  logout$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore) {
      onAuthStateChanged(this.auth, user => {      
        if (user) {
          console.log('user changed: ', user)
          const userDoc = doc(this.firestore, `users/${user.uid}`);
          docData(userDoc, { idField: 'id' }).pipe(
            takeUntil(this.logout$)
          ).subscribe(data => {
            this.currentUserData = data;
          })
        } else {
          this.currentUserData = null;
        }
      })
    }

    async googleSignIn() {
      const provider = new GoogleAuthProvider();
      const credentials = signInWithPopup(this.auth, provider);
      const email = (await (credentials)).user.email;
      const profileImage = await this.getCurrentUserPhotoUrl();
      const name = await this.getCurrentUserName();
      const userDoc = doc(this.firestore, `users/${(await credentials).user.uid}`);
      await updateDoc(userDoc, { 
        email, 
        profileImage, 
        name
      }).catch(err => {
        console.log('UPDATEDOC ERROR');
        setDoc(userDoc, {
          email, 
          profileImage, 
          name
        })
      });
    }

  async register({ email, password }) {
    try { //try-catch-block makes the code more secure
      //creates new user in Firebase Authentication:
      const credentials = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const profileImage = '';
      const userDoc = doc(this.firestore, `users/${(await credentials).user.uid}`);
      await setDoc(userDoc, { 
        email,
        profileImage
      });
      return credentials;
    } catch (err) {
      throw err;
    }
  } 
  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  } 
  async logout() {
    await signOut(this.auth);
    this.router.navigateByUrl('/', {replaceUrl: true});
  }
  
  getCurrentUserId() {
    return this.auth.currentUser.uid; //gets id directly from firebase Auth
  }
  getCurrentUserEmail() {
    return this.auth.currentUser.email; //gets email from constructor of user.service
  }
  getCurrentUserName() {
    return this.auth.currentUser.displayName; //gets name directly from firebase Auth
  }
  getCurrentUserPhotoUrl() { //from Firebase Auth
    return this.auth.currentUser.photoURL;
  }
  getCurrentUser() { //from Firestore 'users'
    const userId = this.getCurrentUserId();
    const userRef = doc(this.firestore, `users/${userId}`);
    return docData(userRef).pipe(
      takeUntil(this.logout$)
    );
  }
}