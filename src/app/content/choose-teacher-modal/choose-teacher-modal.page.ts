import { Component, Input, OnInit } from '@angular/core';
import { ModalController, } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-choose-teacher-modal',
  templateUrl: './choose-teacher-modal.page.html',
  styleUrls: ['./choose-teacher-modal.page.scss'],
})
export class ChooseTeacherModalPage implements OnInit {
  @Input() title: string;
  @Input() notes: string;
  @Input() length: number;
  @Input() videoLocalUrl: string;

  connectionIds = [];
  friends = [];
  groups = [];
  publicTeachers = [];

  selectedUserId = '';
  selectedGroupId = ''; //TO DO
  selectedUserDisplayedString = '';

  constructor(
    private authService: AuthService,
    private userService: UserService, 
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    ////getting friends via conections
    this.getFriends(); //FÜHRT DIE FUNKTION AUS IRGENDEINEM GRUND ZWEI MAL AUS
    /////                 SIEHE KONSOLE
  }

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

  close() {
    this.modalCtrl.dismiss();
  }
  selectUser() {
   this.modalCtrl.dismiss({
      user: { id: this.selectedUserId }
    });
  }
  selectUserName(userName, userEmail) {
    console.log('user name : ', userName, 'user email: ', userEmail);
    this.selectedUserDisplayedString = userName;
    if(this.selectedUserDisplayedString == '') {
      this.selectedUserDisplayedString = userEmail;
    }
  }
  userChange(event) {
    console.log("userChange test", event.detail.value);
    this.selectedUserId = event.detail.value;
  }

}
