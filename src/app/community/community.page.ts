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
  allSelected = "activated";
  friendsSelected = "inactive";
  groupsSelected = "inactive";
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
        this.authService.getUserById(this.receivedRequestId).subscribe(res => { //!!!später mit switchMap um !!!
          this.receivedRequestImage = res.profileImage;
          this.receivedRequestEmail = res.email;
        })
      }
     if (this.sentRequestId !== '') {
        this.authService.getUserById(this.sentRequestId).subscribe (res => {
          this.sentRequestEmail = res.email;
          this.sentRequestImage = res.profileImage;
        })
      }
    });
    this.authService.getCurrentUser().subscribe(res => {
      console.log('current user_friends', res.friends);
      if(res.friends != undefined) {                            //nur wenn friends vorhanden sind:
        this.userService.getAllFriends().subscribe(res => {   //wird getAllFriends() aufgerufen
          this.friends = res;                                 //!!!sollte mit mergeMap oder so besser gelöst werden!!
          console.log('allfriends_subscribed: ', res);
        });
        console.log('several user connections');
      }
    });
  }
  //toggle view: all, friends, groups
  selectAll() {
    if (this.allSelected = "inactive") {
      this.allSelected = "activated";
      this.friendsSelected = "inactive";
      this.groupsSelected = "inactive";
    }
  }
  selectFriends() {
    if (this.friendsSelected = "inactive") {
      this.friendsSelected = "activated";
      this.allSelected = "inactive";
      this.groupsSelected = "inactive";
    }
  }
  selectGroups() {
    if (this.groupsSelected = "inactive") {
      this.groupsSelected = "activated";
      this.friendsSelected = "inactive";
      this.allSelected = "inactive";
    }
  }
  //Vorhandene User zum Senden einer Freundschaftsanfrage per Modal anzeigen
  async openAddConnection() {
    const modal = await this.modalCtrl.create({
      component: AddConnectionModalPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.present();
    const { data } =await modal.onDidDismiss();
    if(data) {
      console.log('modal connectionsPage did work:', data.user.id);
      this.userService.requestConnection(data.user.id); //die id des anzufragenden Users
    }                                                   // wird an die Funktion "requestConnection()" übergeben
  }
  confirmRequest() { 
    this.userService.addConnection(this.receivedRequestId); //hinkünftig connectionRequestId aus dem Array connectionRequests (collection 'user') filtern
  }
  declineRequest() {
    this.userService.cleanConnectionRequests(this.receivedRequestId);
  }

}
