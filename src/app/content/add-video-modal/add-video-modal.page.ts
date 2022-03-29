import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CapacitorVideoPlayer } from 'capacitor-video-player';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-add-video-modal',
  templateUrl: './add-video-modal.page.html',
  styleUrls: ['./add-video-modal.page.scss'],
})
export class AddVideoModalPage implements OnInit {
  @ViewChild('video') captureElement: ElementRef;
  mediaRecorder: MediaRecorder;
  isRecording = false;
  videoPlayer: any;
  playerIsInitialized = false;
  
  videoUrls = [];
  test = '';

  constructor(
    private modalCtrl: ModalController,
    private videoService: VideoService,
    private changeDetector: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.videoPlayer = CapacitorVideoPlayer;
    console.log('player is initialized: ', this.playerIsInitialized);
  }
  close() {
    this.modalCtrl.dismiss();
  }

  async recordVideo() {
    console.log('player is initialized: ', this.playerIsInitialized);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user'
      },
      audio: true
    });
    this.captureElement.nativeElement.srcObject = stream;
    this.captureElement.nativeElement.muted = true;
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
    this.mediaRecorder.start();
    this.mediaRecorder.onstop = async (event) => {
      const videoBuffer = new Blob(chunks, { type: 'video/webm' });
      await this.videoService.storeVideo(videoBuffer);      
      // Reload our list
      this.videoUrls = this.videoService.videos;
      console.log('Video in modal page: ', this.videoUrls);
      this.changeDetector.detectChanges();
    }

  }

  stopRecord() {
    console.log('player is initialized: ', this.playerIsInitialized);
    this.mediaRecorder.stop();
    this.mediaRecorder = null;
    this.captureElement.nativeElement.srcObject = null;
    this.isRecording = false;
  }

  async playVideo(videoUrl) {
    const base64data = await this.videoService.getVideoUrl(videoUrl);
    // Show player emebdded
    await this.videoPlayer.initPlayer({
      mode: 'embedded',
      url: base64data,
      playerId: 'player',
      componentTag: 'app-add-video-modal'
    });
  }
  setPlayer() {
    this.playerIsInitialized = true;
  }

  takeVideo() {
    this.modalCtrl.dismiss();
  }

}
