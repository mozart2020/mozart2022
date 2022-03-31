import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentUserImage: string;
  currentUserName: string = '';
  currentUserEmail: string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(res => {
      this.currentUserImage = res.profileImage;
      this.currentUserName = res.name;
      this.currentUserEmail = res.email;
    });
  }

}
