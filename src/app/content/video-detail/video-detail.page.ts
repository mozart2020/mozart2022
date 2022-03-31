import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { VideoService } from 'src/app/services/video.service';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.page.html',
  styleUrls: ['./video-detail.page.scss'],
})
export class VideoDetailPage implements OnInit {
  videoTitle: string;
  videoUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private videoService: VideoService,
    private authService: AuthService,
    private firestore: Firestore
  ) { }

  ngOnInit() {
    this.getVideo();
  }
  getVideo() {
    const id = this.activatedRoute.snapshot.params['videoId'];
    console.log('ActivatedRoute got: ', id);
    this.videoService.getVideoById(id)
    .subscribe(res => {
      this.videoTitle = res.title;
      this.videoUrl = res.videoUrl;
    });
  }

}
