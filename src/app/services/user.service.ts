import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
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
  orderBy,
  documentId,
  serverTimestamp
} from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  logout$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private firestore: Firestore,
    private firebaseAuth: Auth,
    private authService: AuthService    
  ) {
    onAuthStateChanged(this.firebaseAuth, user => {
      if (!user) {
        this.logout$.next(true);
      }
    })
  }

////// GET USER SECTION ///////////
  getAllUsers() {
    const currentUserId = this.authService.getCurrentUserId();
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, { idField: 'id' })
    .pipe(
      takeUntil(this.logout$), //returns Data until logout: Subject logout$ emits value
      map(users => {           // in onAuthStateChanged(), incoked in constructor()
        return users.filter(user => user.id != currentUserId);
      })
    );
  }
  getUserById(id) { //gibt einen einzigen user aus
    const userRef = doc(this.firestore, `users/${id}`);
    return docData(userRef);
  }
  getUsersByConnectionIds(ids: any) { //gibt einen array of users aus
    const currentUserId = this.authService.getCurrentUserId();
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, { idField: 'id' }).pipe(
      map(users => {
        //filtert die user aller connections des current users heraus zieht den current user davon ab:
        return users.filter(user => ids.includes(user.id) && user.id != currentUserId);
      })
    )
  }
  getUsersExcludedByConnectionIds(ids: any) { //gibt einen array of users aus
    const currentUserId = this.authService.getCurrentUserId();
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, { idField: 'id' }).pipe(
      map(users => {
        //filtert die user aller connections des current users heraus zieht den current user davon ab:
        return users.filter(user => !ids.includes(user.id) && user.id != currentUserId);
      })
    )
  } 
  getPublicTeachers() {
    const usersRef = collection(this.firestore, 'users');
    console.log('logout$: ', this.logout$);
    return collectionData(usersRef, { idField: 'id' })
    .pipe(
      takeUntil(this.logout$), //returns Data until logout: Subject logout$ emits value
      map(users => {           // in onAuthStateChanged(), incoked in constructor()
        return users.filter(user => user.publicTeacher == true);
      })
    );
  }

//////// EDIT USER SECTION ////////////////
  updateUser(id, name, aboutMe, country) {
    const userRef = doc(this.firestore, `users/${id}`);
    updateDoc(userRef, {name: name, aboutMe: aboutMe, country: country});
  }

/////////CONNECTION SECTION//////////////
  //Senden einer Freundschaftsanfrage:
  getCurrentUserConnections() {
    const currentUserId = this.authService.getCurrentUserId();
    const connectionsRef = collection(this.firestore, 'connections');
    const q = query(connectionsRef, where ('users', 'array-contains', currentUserId));
    return collectionData(q, {idField: 'connectionId'});
  }
  requestConnection(requestedUserId) { //id = userId des angefragen Users
    const userDocRef = doc(this.firestore, `users/${requestedUserId}`); //Referenz zum document des angefragten Users
    const currentUserId = this.authService.getCurrentUserId(); //id des anfragenden Users (currentUserID)
    const users = [requestedUserId, currentUserId];
    for (let user of users) { //geht durch die User (userIds) im neuen connection-document
      const userRef = doc(this.firestore, `users/${user}`); //referenziert die Collection 'users'
      if(user == currentUserId) { //für den requesting user (currentUser);
        updateDoc(userRef, {  
          sentConnectionRequests: requestedUserId //muss später als Array behandelt werden: requestingUserId aus dem Array heraus nehmen!!
        });
      } else {                  //für den requested user (currentUser);
        updateDoc(userRef, {
          receivedConnectionRequests: currentUserId //muss später als Array behandelt werden: currentUserId aus dem Array heraus nehmen!!
        });
      }
    }
    return updateDoc(userDocRef, { connectionRequests: currentUserId }); //zu Array.push umwandeln
  }
  //Annehmen einer Freundschaftsanfrage:
  addFriend(requestingUserId) {
    const currentUserId = this.authService.getCurrentUserId(); //id des requested users (currentUserId)
    const connectionsRef = collection(this.firestore, 'connections'); //Referenz zur Collection 'Connections'
    const users = [requestingUserId, currentUserId]; // Ids der requesting und requested User als Array-Variable 'users'
    const promises = [];
    return addDoc(connectionsRef,{ 
        date: serverTimestamp(), 
        groupName: '', 
        users }).then(res =>{ //erstellt eine neue Connection
      console.log('created connection: ', res);                 // mit date, groupName und user
      const connectionId = res.id;                  //holt sich die Connections Id in die Variable 'connectionId'
      console.log('connectionId: ;', connectionId)
      //const promises = [];
      for (let user of users) { //geht durch die User (userIds) im neuen connection-document
        console.log('user of users: ', user);
         const userRef = doc(this.firestore, `users/${user}`); //referenziert die Collection 'users'
         if(user == currentUserId) { //für den requested user (currentUser);
            updateDoc(userRef, {  
              //friends: arrayUnion(requestingUserId), //fügt den requesting user zum Array-Feld 'friends' hinzu
              receivedConnectionRequests: '' //muss später als Array behandelt werden: requestingUserId aus dem Array heraus nehmen!!
            });
          } else {                  //für den requesting user (currentUser);
            updateDoc(userRef, {
              //friends: arrayUnion(currentUserId), //fügt den requested user zum Array-Feld 'friends' hinzu
              sentConnectionRequests: '' //muss später als Array behandelt werden: currentUserId aus dem Array heraus nehmen!!
            });
          }
      }    
      return Promise.all(promises);
    });
  }
  //Ablehnen einer Freundschaftsanfrage:
  cleanConnectionRequests(requestingUserId) {
    const currentUserId = this.authService.getCurrentUserId(); //id des requested users (currentUserId)
    const users = [requestingUserId, currentUserId]; // Ids der requesting und requested User als Array-Variable 'users'
    for (let user of users) { //geht durch die User (userIds) im neuen connection-document
      const userRef = doc(this.firestore, `users/${user}`); //referenziert die Collection 'users'
      if(user == currentUserId) { //für den requested user (currentUser);
        updateDoc(userRef, {  
          receivedConnectionRequests: '' //muss später als Array behandelt werden: requestingUserId aus dem Array heraus nehmen!!
        });
      } else {                  //für den requesting user (currentUser);
        updateDoc(userRef, {
          sentConnectionRequests: '' //muss später als Array behandelt werden: currentUserId aus dem Array heraus nehmen!!
        });
      }
    }
  }

//////////////// CHAT SECTION //////////////////////
  getConnectionInfo(connectionId) {
    const connectionRef = doc(this.firestore, `connections/${connectionId}`);
    return docData(connectionRef);
  }
  getChatMessages(connectionId) {
    const messagesRef = collection(this.firestore, `connections/${connectionId}/messages`);
    const q = query(messagesRef, orderBy('createdAt'));
    return collectionData(q, { idField: 'id' });
  }
  addMessage(connectionId, msg) {
    const userId = this.authService.getCurrentUserId();
    const messagesRef = collection(this.firestore, `connections/${connectionId}/messages`);
    return addDoc(messagesRef, {
      from: userId,
      msg,
      createdAt: serverTimestamp()
    }); 
  }
}

