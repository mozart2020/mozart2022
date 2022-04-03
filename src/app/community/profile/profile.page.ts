import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { UpdateProfileModalPage } from './update-profile-modal/update-profile-modal.page';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentUserProfileImage: string;
  currentUserName: string = '';
  currentUserEmail: string;
  currentUserAboutMe: string = '';
  currentUserCountry: string = '';
  currentUserSubjects: string = '';
  currentUserLanguages: string = '';

  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(res => {
      this.currentUserEmail = res.email;
      if (res.profileImage != undefined) {
        this.currentUserProfileImage = res.profileImage;
      }
      if (res.name != undefined) {
        this.currentUserName = res.name;
      }       
      if (res.aboutMe != undefined) {
        this.currentUserAboutMe = res.aboutMe;
      }
      if (res.country != undefined) {
        this.currentUserCountry = res.country;
      }
      if (res.languages != undefined) {
        this.currentUserLanguages = res.languages.join(", ");
      }
      if (res.subjects != undefined) {      
        this.currentUserSubjects = res.subjects.join(", ");
        console.log('res.Subjects[ ] - ', res.subjects);
      }
    });
  }
  async openUpdateModal() {
    const id = this.authService.getCurrentUserId();
    const modal = await this.modalCtrl.create({
      component: UpdateProfileModalPage,
      componentProps: { id: id },
      initialBreakpoint: 0.8
    });
    await modal.present();
  }
  async infoAlert() {
    const alert = await this.alertCtrl.create({
      header: 'subjects - languages',
      subHeader: 'Features "Adding&Updating subjects and languages are in progress.',
      message: 'Implementation of language and subject pickers possibly necessary. Same to country, actually.',
      buttons: ['OK']
    });
    await alert.present();
  }

}
