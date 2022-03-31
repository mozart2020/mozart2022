import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  exampleDate = new Date().toString();
  currentUserImage: string;
  currentUserVideos = [];
  studentVideos = [];
  allSelected = "activated";
  myVideosSelected = "inactive";
  studentVideosSelected = "inactive";

  constructor(
    private authService: AuthService,
    private videoService: VideoService
  ) {

  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(res => {
      this.currentUserImage = res.profileImage;
    });
    this.videoService.getVideos().subscribe(res => {
      this.currentUserVideos = res;
      console.log('current user videos: ', res);
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