import { Component, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AddConnectionModalPage } from './add-connection-modal/add-connection-modal.page';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
//import { NotificationsService } from '../services/notifications.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';


@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit {
  currentUserEmail: string;
  currentUserImage: string;
  friendsIds = [];
  friends = [];
  groups = [];

  connections = [];
  connectionIds = [];

  allSelected = true;
  friendsSelected = false;
  groupsSelected = false;
  receivedRequestId = ''; 
  receivedRequestImage = '';
  receivedRequestEmail = '';
  sentRequestId = '';
  sentRequestEmail = '';
  sentRequestImage = '';
  subscriptions = new Subscription();
  logout$: Subject<boolean> = new Subject<boolean>();

  

  constructor(
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet, 
    private userService: UserService,
    private authService: AuthService,
    //private notifications: NotificationsService,
    private firebaseAuth: Auth
  ) {
    onAuthStateChanged(this.firebaseAuth, user => {
      if (!user) {
        this.logout$.next(true);
      }
    })
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(res => {
      this.currentUserImage = res.profileImage;
      this.currentUserEmail = res.email;
      if(res.receivedConnectionRequests !== undefined) {
        this.receivedRequestId = res.receivedConnectionRequests;
      }
      if(res.sentConnectionRequests !== undefined) {
        this.sentRequestId = res.sentConnectionRequests;
      }
      //checkt, ob Freundschaftsanfragen vorliegen:
      if (this.receivedRequestId !== '') { //wenn ja, werden die Daten geholt:
        this.userService.getUserById(this.receivedRequestId).subscribe(res => { //!!!später mit switchMap um !!!
          this.receivedRequestImage = res.profileImage;
          this.receivedRequestEmail = res.email;
        })
      }
     if (this.sentRequestId !== '') {
        this.userService.getUserById(this.sentRequestId).subscribe (res => {
          this.sentRequestEmail = res.email;
          this.sentRequestImage = res.profileImage;
        })
      }
    });
    ////getting friends via conections
    this.getFriends(); //FÜHRT DIE FUNKTION AUS IRGENDEINEM GRUND ZWEI MAL AUS
    /////                 SIEHE KONSOLE
  }
//getting friends via connections:
getFriends() {
  const currentUserId = this.authService.getCurrentUserId();
  this.userService.getCurrentUserConnections().subscribe(res => { //lädt alle connections des current users
    const test = res.forEach(value => { //geht durch alle geladenen connections durch
      if (value.groupName == '') {      //filtert alle groups weg, friendships bleiben übrig
        const users = value.users;      //holt sich die user ids als Array
        users.forEach(id => {
          this.connectionIds.push(id);
          console.log('current value of connectionIds: ', this.connectionIds);
        });
      }
    });
    this.userService.getUsersByConnectionIds(this.connectionIds).subscribe(res => {
      this.friends = res;
      console.log('friends: ', res); //CHECKEN WIE MAN DAS ASYNCHRON HINKRIEGT
    });
  })
}
getNonFriends() {
  
}

  //toggle view: all, friends, groups
  selectAll() {
    if (this.allSelected == false) {
      this.allSelected = true;
      this.friendsSelected = false;
      this.groupsSelected = false;
    }
    console.log (this.allSelected, this.friendsSelected, this.groupsSelected);
  }
  selectFriends() {
    if (this.friendsSelected == false) {
      this.friendsSelected = true;
      this.allSelected = false;
      this.groupsSelected = false;     
    } 
    console.log (this.allSelected, this.friendsSelected, this.groupsSelected);
  }
  selectGroups() {
    if (this.groupsSelected == false) {
      this.groupsSelected = true;
      this.friendsSelected = false;
      this.allSelected = false;
    }
    console.log (this.allSelected, this.friendsSelected, this.groupsSelected);
  }
  //Vorhandene User zum Senden einer Freundschaftsanfrage per Modal anzeigen
  async openAddConnection() {
    console.log('Data for componentProps: ', this.connectionIds);
    const modal = await this.modalCtrl.create({
      component: AddConnectionModalPage,
      componentProps: { connectionIds: this.connectionIds},
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      cssClass: 'transparent-modal'
    });
    modal.present();
    const { data } =await modal.onDidDismiss();
    if(data) {
      console.log('modal connectionsPage did work:', data.user.id);
      this.userService.requestConnection(data.user.id); //die id des anzufragenden Users
    }                                                   // wird an die Funktion "requestConnection()" übergeben
  }
  confirmRequest() { 
    this.userService.addFriend(this.receivedRequestId); //hinkünftig connectionRequestId aus dem Array connectionRequests (collection 'user') filtern
  }
  declineRequest() {
    this.userService.cleanConnectionRequests(this.receivedRequestId);
  }

}
