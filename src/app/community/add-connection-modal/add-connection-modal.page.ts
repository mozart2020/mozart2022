import { Component, Input, OnInit } from '@angular/core';
import { ModalController, } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-connection-modal',
  templateUrl: './add-connection-modal.page.html',
  styleUrls: ['./add-connection-modal.page.scss'],
})
export class AddConnectionModalPage implements OnInit {
  @Input() connectionIds: any;
  notConnectedUsers=[];
  selectedUserId: string = '';
  selectedUserName: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService, 
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    //all users - friends excluded
    this.userService.getUsersExcludedByConnectionIds(this.connectionIds).subscribe(res => {
      this.notConnectedUsers = res;
    })
  }
  close() {
    this.modalCtrl.dismiss();
  }
  selectUser() {
   this.modalCtrl.dismiss({
      user: { id: this.selectedUserId }
    })
    console.log('selectUser(user): ');
  }
  selectUserName(userName) {
    console.log('user name : ', userName);
    this.selectedUserName = userName;
    if(this.selectedUserName == '') {
      this.selectedUserName = 'selected user';
    }
  }
  userChange(event) {
    console.log("userChange test", event.detail.value);
    this.selectedUserId = event.detail.value;
  }
 
}
