import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-friend-detail',
  templateUrl: './friend-detail.page.html',
  styleUrls: ['./friend-detail.page.scss'],
})
export class FriendDetailPage implements OnInit {
  friendId: string;
  connectionId: string;
  friendEmail: string;
  friendProfileImage = '';
  friendName = '';
  friendAboutMe = '';
  friendCountry = '';
  friendLanguages: string = '';
  friendSubjects: string = '';

  constructor(
    private alertCtrl: AlertController,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getFriend();
    this.getConnectionId();
  }
  getFriend() {
    const id = this.activatedRoute.snapshot.params['friendId'];
    console.log('ActivatedRoute got: ', id);
    this.userService.getUserById(id)
    .subscribe(res => {
      this.friendId = id;
      this.friendEmail = res.email;
      if (res.profileImage != undefined) {
        this.friendProfileImage = res.profileImage;
      }
      if (res.name != undefined) {
        this.friendName = res.name;
      }       
      if (res.aboutMe != undefined) {
        this.friendAboutMe = res.aboutMe;
      }
      if (res.country != undefined) {
        this.friendCountry = res.country;
      }
      if (res.languages != undefined) {
        this.friendLanguages = res.languages.join(", ");
      }
      if (res.subjects != undefined) {      
        this.friendSubjects = res.subjects.join(", ");
        console.log('res.Subjects[ ] - ', res.subjects);
      }
    })
  }
  removeFriend() {

  }
  getConnectionId() {
    //const currentUserId = this.authService.getCurrentUserId();
    this.userService.getCurrentUserConnections().subscribe(res => { //lädt alle connections des current users
      const test = res.forEach(value => { //geht durch alle geladenen connections durch
        if (value.groupName == '') {      //filtert alle groups weg, friendships bleiben übrig
          const users = value.users;      //holt sich die user ids als Array
          users.forEach(id => {
            if(id == this.friendId) {
              console.log(value);
              this.connectionId = value.id;
            }
          });
        }
      });
    })
  }
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Remove friend, are you sure?',
      subHeader: 'Feature "removing friends" is in progress.',
      message: 'Includes removing connection and updating lessons.',
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
