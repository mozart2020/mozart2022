import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-profile-modal',
  templateUrl: './update-profile-modal.page.html',
  styleUrls: ['./update-profile-modal.page.scss'],
})
export class UpdateProfileModalPage implements OnInit {
  @Input() id: string;
  userName: string = '';
  userAboutMe: string = '';
  userCountry: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.authService.getUserById(this.id).subscribe(res => {
      this.userName = res.name;
      console.log('update profile modal userName in ngOnInit: ', this.userName);
      this.userAboutMe = res.aboutMe;
      this.userCountry = res.country;
    })
  }
  async updateUser() {
    this.userService.updateUser(this.id, this.userName, this.userAboutMe, this.userCountry);
    this.modalCtrl.dismiss();
  }
  cancel() {
    this.modalCtrl.dismiss();
  }

}
