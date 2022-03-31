import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  currentUserImage: string;
  currentUserVideos = [];
  studentVideos = [];
  allSelected = "activated";
  myVideosSelected = "inactive";
  studentVideosSelected = "inactive";

  constructor(
    private routerOutlet: IonRouterOutlet,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(res => {
      this.currentUserImage = res.profileImage;
    });
  }

  selectAll() {
    if (this.allSelected = "inactive") {
      this.allSelected = "activated";
      this.myVideosSelected = "inactive";
      this.studentVideosSelected = "inactive";
    }
  }
  selectMyVideos() {
    if (this.myVideosSelected = "inactive") {
      this.myVideosSelected = "activated";
      this.allSelected = "inactive";
      this.studentVideosSelected = "inactive";
    }
  }
  selectStudentVideos() {
    if (this.studentVideosSelected = "inactive") {
      this.studentVideosSelected = "activated";
      this.myVideosSelected = "inactive";
      this.allSelected = "inactive";
    }
  }

}