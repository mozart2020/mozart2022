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
    private firebaseAuth: Auth,
    private authService: AuthService    
  ) {
    onAuthStateChanged(this.firebaseAuth, user => {
      if (!user) {
        this.logout$.next(true);
      }
    })
  }

  //// GET USER SECTION ///////////
  getUserById(id) { //from Firestore 'users'
    const userRef = doc(this.firestore, `users/${id}`);
    return docData(userRef);
  }
  getUsersByConnectionIds(ids: any) {
    const currentUserId = this.authService.getCurrentUserId();
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, { idField: 'id' }).pipe(
      map(users => {
        //filtert die user aller connections des current users heraus zieht den current user davon ab:
        return users.filter(user => ids.includes(user.id) && user.id != currentUserId);
      })
    )
  }
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
    const currentUserId = this.authService.getCurrentUserId();
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

/* ||||| get user connections via id-double check betwen docField 'connections' in 
         collection 'users' and collection 'connections' */
  getConnectionsSafeVersion() {
    const currentUserId = this.authService.getCurrentUserId();
    const userRef = doc(this.firestore, `users/${currentUserId}`);
    return docData(userRef).pipe(
      switchMap(data => {
        console.log('currentUser data via getAllFriendsNew(): ', data);
        const userConnections = data.connections;
        console.log('currentUser connections via getAllFriendsNew(): ', userConnections);
        const connectionsRef = collection(this.firestore, 'connections');
        const q = query(connectionsRef, where(documentId(), 'in', userConnections));
        return collectionData(q, { idField: 'id'});
      })
    )
  } 
/* |||||| get user connections via simple scanning collection 'connections'
          for userId in docField 'users' */
  getCurrentUserConnections() {
    const currentUserId = this.authService.getCurrentUserId();
    const connectionsRef = collection(this.firestore, 'connections');
    const q = query(connectionsRef, where ('users', 'array-contains', currentUserId));
    return collectionData(q, {idField: 'connectionId'});
  }
  getUsersByConnectionId(id) {
    const connectionRef = doc(this.firestore, `connections/${id}`);
    return docData(connectionRef).pipe(
      switchMap(data => {
        const connectionUsers = data.users;
        const usersRef = collection(this.firestore, 'users');
        const q = query(usersRef, where(documentId(), 'in', connectionUsers));
        return collectionData(q, {idField: 'userId'});
      }),
      map(users => console.log('wir befinden uns in getUserByConnectionId: ', users)))
      /*
      .pipe(
      takeUntil(this.logout$), //returns Data until logout: Subject logout$ emits value
      map(users => {           // in onAuthStateChanged(), incoked in constructor()
        return users.filter(user => user.id != currentUserId);
      })
    );
      */
  }

  getAllNotFriends() {
    const currentUserId = this.authService.getCurrentUserId();
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
  ////// EDIT USER SECTION ////////////////
  updateUser(id, name, aboutMe, country) {
    const userRef = doc(this.firestore, `users/${id}`);
    updateDoc(userRef, {name: name, aboutMe: aboutMe, country: country});
  }

  /////// CONNECTION SECTION //////////////////
  checkCurrentUSerConnections() {
    const currentUserId = this.authService.getCurrentUserId();
    const connectionsRef = collection(this.firestore, 'connections');
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
    console.log('requestConnection userDocRef: ', userDocRef)
    return updateDoc(userDocRef, { connectionRequests: currentUserId }); //zu Array.push umwandeln
  }
  //Annehmen einer Freundschaftsanfrage:
  addFriend(requestingUserId) {
    const currentUserId = this.authService.getCurrentUserId(); //id des requested users (currentUserId)
    const connectionsRef = collection(this.firestore, 'connections'); //Referenz zur Collection 'Connections'
    const date = new Date;                          //aktuelles Datum
    const groupName = '';
    const users = [requestingUserId, currentUserId]; // Ids der requesting und requested User als Array-Variable 'users'
    const promises = [];
    return addDoc(connectionsRef,{ date, groupName, users }).then(res =>{ //erstellt eine neue Connection
      console.log('created connection: ', res);                 // mit date und user
      const connectionId = res.id;                  //holt sich die Connections Id in die Variable 'connectionId'
      console.log('connectionId: ;', connectionId)
      //const promises = [];
      for (let user of users) { //geht durch die User (userIds) im neuen connection-document
        console.log('user of users: ', user);
         const userRef = doc(this.firestore, `users/${user}`); //referenziert die Collection 'users'
         if(user == currentUserId) { //für den requested user (currentUser);
            updateDoc(userRef, {  
              friends: arrayUnion(requestingUserId), //fügt den requesting user zum Array-Feld 'friends' hinzu
              receivedConnectionRequests: '' //muss später als Array behandelt werden: requestingUserId aus dem Array heraus nehmen!!
            });
          } else {                  //für den requesting user (currentUser);
            updateDoc(userRef, {
              friends: arrayUnion(currentUserId), //fügt den requested user zum Array-Feld 'friends' hinzu
              sentConnectionRequests: '' //muss später als Array behandelt werden: currentUserId aus dem Array heraus nehmen!!
            });
          }
          updateDoc(userRef, {
            connections: arrayUnion(connectionId) //fügt die neue connection den users hinzu, wenn noch nicht vorhanden
          });
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

}
