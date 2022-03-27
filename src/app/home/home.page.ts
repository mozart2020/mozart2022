import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  receivedRequestId = '';

  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService
    ) {}

    ngOnInit(): void {
      this.authService.getCurrentUser().subscribe(res => {
        if(res.receivedConnectionRequests != undefined) {
          this.receivedRequestId = res.receivedConnectionRequests;
        }
      });
    }
  
    async confirmLogout() {
      const alert = await this.alertCtrl.create({
        header: 'Logout',
        message: 'Do you want to logout?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button'
          }, {
            text: 'Logout',
            id: 'confirm-button',
            handler: () => {
              this.authService.logout();
            }
          }
        ]
      });
  
      await alert.present();
    }
  
 

}
