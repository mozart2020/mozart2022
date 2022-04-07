import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.page.html',
  styleUrls: ['./video-detail.page.scss'],
})
export class VideoDetailPage implements OnInit, AfterViewInit{
  @ViewChild('studentVideo') studentVideo: ElementRef;

  videoTitle: string;
  videoUrl: string;
  duration: number;
  timeLine: number;
  currentTime: number = 0;
  paused: boolean;

  playButtonStatus = true;
  

  constructor(
    private activatedRoute: ActivatedRoute, 
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.getVideo();

  }
  ngAfterViewInit() {
    this.onLoadedVideoData();
    this.onPlayStudentVideo();
    this.onPauseStudentVideo();
    this.timeLineProgress();
    //this.timeLineController();
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

  onLoadedVideoData() {
    fromEvent(this.studentVideo.nativeElement, 'loadeddata').subscribe(res => {
      this.duration = this.studentVideo.nativeElement.duration;
      console.log('duration: ', this.duration);
      this.paused = this.studentVideo.nativeElement.paused;
      console.log('paused: ', this.paused);
    })
  }
  timeLineProgress() {
    fromEvent(this.studentVideo.nativeElement, 'timeupdate').subscribe(res => {
      this.currentTime = this.studentVideo.nativeElement.currentTime;
      this.timeLine = this.studentVideo.nativeElement.currentTime/this.duration;
    })
  }

  onPlayStudentVideo() {
    fromEvent(this.studentVideo.nativeElement, 'play').subscribe(res => {
      this.paused = false;
      console.log('paused: ', this.paused);
    })
  }
  onPauseStudentVideo() {
    fromEvent(this.studentVideo.nativeElement, 'pause').subscribe(res => {
      this.paused = true;
      console.log('paused: ', this.paused);
    })
  }

 //////// CONTROL VIDEO SECTION ///////////
 
  playPauseStudentVideo() {
    if (this.studentVideo.nativeElement.paused == true) {
      this.studentVideo.nativeElement.play();
      this.paused = false;
      console.log('paused: ', this.paused);
    }
    else {     
      this.studentVideo.nativeElement.pause();
      this.paused = true;
      console.log('paused: ', this.paused);
    }
  }

}
