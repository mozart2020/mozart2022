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
  documentId
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
      private auth: AuthService,
      private firebaseAuth: Auth
  ) {
    onAuthStateChanged(this.firebaseAuth, user => {
      if (!user) {
        this.logout$.next(true);
      }
    })
  }
  getAllUsers() {
    const currentUserId = this.auth.getCurrentUserId();
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, { idField: 'id' })
    .pipe(
      takeUntil(this.logout$), //returns Data until logout: Subject logout$ emits value
      map(users => {           // in onAuthStateChanged(), incoked in constructor()
        return users.filter(user => user.id != currentUserId);
      })
    );
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
  getAllFriends() {
    const currentUserId = this.auth.getCurrentUserId();
    const userRef = doc(this.firestore, `users/${currentUserId}`);
    return docData(userRef).pipe(
      switchMap(data => {
        const userFriends = data.friends;
        console.log('userFriends not undefined: ', userFriends);
        const friendsRef = collection(this.firestore, 'users');
        const q = query(friendsRef, where(documentId(), 'in', userFriends));
        return collectionData(q, { idField: 'id' });        
      })
    )
  }
  getAllNotFriends() {
    const currentUserId = this.auth.getCurrentUserId();
    const userRef = doc(this.firestore, `users/${currentUserId}`);
    return docData(userRef).pipe(
      switchMap(data => {
        const userFriends = data.friends;
        console.log('data.friends: ', userFriends);
        const friendsRef = collection(this.firestore, 'users');
        const q = query(friendsRef, where(documentId(), 'not-in', userFriends));
        return collectionData(q, { idField: 'id' });
      }),
      map(users => {           // in onAuthStateChanged(), incoked in constructor()
        return users.filter(user => user.id != currentUserId);
      })
      
    )
  }
  checkCurrentUSerConnections() {
    const currentUserId = this.auth.getCurrentUserId();
    const connectionsRef = collection(this.firestore, 'connections');
  }
  getCurrentUserConnections() {
    const currentUserId = this.auth.getCurrentUserId();
    const connectionsRef = collection(this.firestore, 'connections');
    const q = query(connectionsRef, where ('users', 'array-contains', currentUserId));
    return collectionData(q, {idField: 'connectionId'});
  }
  getFriendsIds() {
    this.getCurrentUserConnections().subscribe( userConnections => {
    const userArrays = []
    userConnections.forEach(connections => {
      const users = connections.users;
      userArrays.push(users[0]);
      userArrays.push(users[1]);
    });
    const friendsIds = [...new Set(userArrays)];
    console.log ('friendsIds: ', friendsIds);
    })
  }
  ///////Connection-Section:
  //Senden einer Freundschaftsanfrage:
  requestConnection(requestedUserId) { //id = userId des angefragen Users
    const userDocRef = doc(this.firestore, `users/${requestedUserId}`); //Referenz zum document des angefragten Users
    const currentUserId = this.auth.getCurrentUserId(); //id des anfragenden Users (currentUserID)
    const users = [requestedUserId, currentUserId];
    for (let user of users) { //geht durch die User (userIds) im neuen connection-document
      const userConnectionRef = doc(this.firestore, `users/${user}`); //referenziert die Collection 'users'
      if(user == currentUserId) { //für den requesting user (currentUser);
        updateDoc(userConnectionRef, {  
          sentConnectionRequests: requestedUserId //muss später als Array behandelt werden: requestingUserId aus dem Array heraus nehmen!!
        });
      } else {                  //für den requested user (currentUser);
        updateDoc(userConnectionRef, {
          receivedConnectionRequests: currentUserId //muss später als Array behandelt werden: currentUserId aus dem Array heraus nehmen!!
        });
      }
    }
    console.log('requestConnection userDocRef: ', userDocRef)
    return updateDoc(userDocRef, { connectionRequests: currentUserId }); //zu Array.push umwandeln
  }
  //Annehmen einer Freundschaftsanfrage:
  addConnection(requestingUserId) {
    const currentUserId = this.auth.getCurrentUserId(); //id des requested users (currentUserId)
    const connectionsRef = collection(this.firestore, 'connections'); //Referenz zur Collection 'Connections'
    const date = new Date;                          //aktuelles Datum
    const users = [requestingUserId, currentUserId]; // Ids der requesting und requested User als Array-Variable 'users'
    const promises = [];
    return addDoc(connectionsRef,{ date, users }).then(res =>{ //erstellt eine neue Connection
      console.log('created connection: ', res);                 // mit date und user
      const connectionId = res.id;                  //holt sich die Connections Id in die Variable 'connectionId'
      console.log('connectionId: ;', connectionId)
      //const promises = [];
      for (let user of users) { //geht durch die User (userIds) im neuen connection-document
        console.log('user of users: ', user);
         const userConnectionRef = doc(this.firestore, `users/${user}`); //referenziert die Collection 'users'
         if(user == currentUserId) { //für den requested user (currentUser);
            updateDoc(userConnectionRef, {  
              friends: arrayUnion(requestingUserId), //fügt den requesting user zum Array-Feld 'friends' hinzu
              receivedConnectionRequests: '' //muss später als Array behandelt werden: requestingUserId aus dem Array heraus nehmen!!
            });
          } else {                  //für den requesting user (currentUser);
            updateDoc(userConnectionRef, {
              friends: arrayUnion(currentUserId), //fügt den requested user zum Array-Feld 'friends' hinzu
              sentConnectionRequests: '' //muss später als Array behandelt werden: currentUserId aus dem Array heraus nehmen!!
            });
          }
          updateDoc(userConnectionRef, {
            connections: arrayUnion(connectionId) //fügt die neue connection den users hinzu, wenn noch nicht vorhanden
          });
      }
    
      return Promise.all(promises);
    });
  }
  //Ablehnen einer Freundschaftsanfrage:
  cleanConnectionRequests(requestingUserId) {
    const currentUserId = this.auth.getCurrentUserId(); //id des requested users (currentUserId)
    const users = [requestingUserId, currentUserId]; // Ids der requesting und requested User als Array-Variable 'users'
    for (let user of users) { //geht durch die User (userIds) im neuen connection-document
      const userConnectionRef = doc(this.firestore, `users/${user}`); //referenziert die Collection 'users'
      if(user == currentUserId) { //für den requested user (currentUser);
        updateDoc(userConnectionRef, {  
          receivedConnectionRequests: '' //muss später als Array behandelt werden: requestingUserId aus dem Array heraus nehmen!!
        });
      } else {                  //für den requesting user (currentUser);
        updateDoc(userConnectionRef, {
          sentConnectionRequests: '' //muss später als Array behandelt werden: currentUserId aus dem Array heraus nehmen!!
        });
      }
    }
  }

}
