import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-connection-modal',
  templateUrl: './add-connection-modal.page.html',
  styleUrls: ['./add-connection-modal.page.scss'],
})
export class AddConnectionModalPage implements OnInit {
  notConnectedUsers=[];

  constructor(
    private authService: AuthService,
    private userService: UserService, 
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(res => {
      console.log('current user_friends', res.friends);
      if(res.friends == undefined) {                          //nur wenn keine friends vorhanden sind:
        this.userService.getAllUsers().subscribe(res => {   //wird getAllUsers() aufgerufen
          this.notConnectedUsers = res;                   //!!!sollte mit mergeMap oder so besser gelöst werden!!
          console.log('all Users except me: ', res);
        });
      }
      if(res.friends !== undefined) {                           //nur wenn friends vorhanden sind:
        this.userService.getAllNotFriends().subscribe(res => { //wird getAllNotFriends() aufgerufen
          this.notConnectedUsers = res;                //!!!sollte mit mergeMap oder so besser gelöst werden!!
          console.log('all Not Friends: ', res);
        });
      }
    });
  }
  close() {
    this.modalCtrl.dismiss();
  }
  selectUser(user) {
    this.modalCtrl.dismiss({
      user: { id: user.id }
    })
  }

}