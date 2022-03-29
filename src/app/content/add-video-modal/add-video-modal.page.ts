import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CapacitorVideoPlayer } from 'capacitor-video-player';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-add-video-modal',
  templateUrl: './add-video-modal.page.html',
  styleUrls: ['./add-video-modal.page.scss'],
})
export class AddVideoModalPage implements OnInit {
  currentUserImage: string;
  @ViewChild('video') captureElement: ElementRef;
  mediaRecorder: MediaRecorder;
  videoPlayer: any;
  isRecording = false;
  videos = [];

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private videoService: VideoService,
    private changeDetector: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.videoPlayer = CapacitorVideoPlayer;
    this.authService.getCurrentUser().subscribe(res => {
      this.currentUserImage = res.profileImage;
    });
  }
  close() {
    this.modalCtrl.dismiss();
  }

  async recordVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user'
      },
      audio: true
    });
    this.captureElement.nativeElement.srcObject = stream;
    this.isRecording = true;
    //Recorder:
    const options = { mimeType: 'video/webm' };
    this.mediaRecorder = new MediaRecorder(stream, options);
    let chunks = [];
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunks.push(event.data)
      }
    }
    this.mediaRecorder.start(30);
    this.mediaRecorder.onstop = async (event) => {
      const videoBuffer = new Blob(chunks, { type: 'video/webm' });
      await this.videoService.storeVideo(videoBuffer);      
      // Reload our list
      this.videos = this.videoService.videos;
      console.log('Video array in modal page: ', this.videos);
      this.changeDetector.detectChanges();
    }

  }

  stopRecord() {
    this.mediaRecorder.stop();
    this.mediaRecorder = null;
    this.captureElement.nativeElement.srcObject = null;
    this.isRecording = false;
  }

  async playVideo(video) {
    console.log('function playVideo(), video: ', video);
    // Get video as base64 data
    const base64data = await this.videoService.getVideoUrl(video);
    console.log('function playVideo(), base64data: ', base64data);
    // Show the player fullscreen
    await this.videoPlayer.initPlayer({
      mode: 'embedded',
      url: base64data,
      playerId: 'player',
      componentTag: 'app-add-video-modal'
    }); 
  }


}
