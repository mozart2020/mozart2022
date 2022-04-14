import { Component, Input, OnInit } from '@angular/core';
import { ModalController, } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { LessonService } from 'src/app/services/lesson.service';
import { FriendConnections } from 'src/app/services/user.service';

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

  friendIds = [];
  friendConnections: FriendConnections;
  friends = [];
  groups = [];
  publicTeachers = [];

  selectedFriendId = '';
  selectedFriendDisplayedString = '';
  selectedFriendConnectionId = '';

  selectedGroupId = ''; //TO DO  

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private lessonService: LessonService,
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
      res.forEach(value => { //geht durch alle geladenen connections durch
        if (value.groupName == '') {      //filtert alle groups weg, friendships bleiben übrig
          const users = value.users;
          console.log('INSIDE getFriends(): connection id', value.id, 'connection users: ', value.users)     
          //holt sich die friend ids als Array:
          users.forEach(id => {
            this.friendIds.push(id);
          });
        }
      });
      this.userService.getUsersByUserIds(this.friendIds).subscribe(res => {
        this.friends = res;
        console.log('friends INSIDE getUsersByUserIds(this.friendIds): ', res); //CHECKEN WIE MAN DAS ASYNCHRON HINKRIEGT
      });
    })
  }

  //MODAL SECTION:
  close() {
    this.modalCtrl.dismiss();
  }
  
  selectFriend() { //called by clicking button "Ask friend for feedback"
    this.userService.getConnectionByFriendId(this.selectedFriendId).subscribe(res => {
      console.log('Current info inside choose-teacher-modal', res);
      res.forEach(value => this.selectedFriendConnectionId = value.id);
      console.log('dummy addLesson with connectionId inside subscribe', this.selectedFriendConnectionId);
    });


   /* this.modalCtrl.dismiss({
      user: { id: this.selectedUserId }
    }); */
  }
  selectFriendName(friendName: string, friendEmail: string) {
    console.log('friend name : ', friendName, 'friend email: ', friendEmail);
    this.selectedFriendDisplayedString = friendName;
    if(this.selectedFriendDisplayedString == '') {
      this.selectedFriendDisplayedString = friendEmail;
    }
  }
  friendChange(event: any) {
    console.log("friendChange test", event.detail.value);
    this.selectedFriendId = event.detail.value;
  }

}
