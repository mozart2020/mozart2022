import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { CapacitorVideoPlayer } from 'capacitor-video-player';
import { VideoService } from 'src/app/services/video.service';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

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
  videoBlob: Blob;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private videoService: VideoService,
    private changeDetector: ChangeDetectorRef,
    //private http: HttpClient,
    private toastCtrl: ToastController
    ) {

  }

  ngOnInit() {
    this.videoPlayer = CapacitorVideoPlayer;
    console.log('player is initialized: ', this.playerIsInitialized);
  }
  close() {
    this.modalCtrl.dismiss();
  }
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    toast.present();
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
      this.videoBlob = videoBuffer;
      await this.videoService.storeVideo(videoBuffer);      
      // Reload our list
      this.videoUrls = this.videoService.videos;
      console.log('Video in modal page: ', this.videoUrls);
      this.changeDetector.detectChanges();
    }

  }

  async playVideo(videoUrl) {
    const base64dataUrl = await this.videoService.getVideoBase64Url(videoUrl);
    // Show player emebdded
    await this.videoPlayer.initPlayer({
      mode: 'embedded',
      url: base64dataUrl,
      playerId: 'player',
      componentTag: 'app-add-video-modal'
    });
  }
  setPlayer() {
    this.playerIsInitialized = true;
  }
  stopRecord() {
    console.log('player is initialized: ', this.playerIsInitialized);
    this.mediaRecorder.stop();
    this.mediaRecorder = null;
    this.captureElement.nativeElement.srcObject = null;
    this.isRecording = false;
  }
  //Upload section:
  async takeAndUploadVideo(videoUrl) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading video...',
    });
    await loading.present();
    const fileName = 'test';
    const formData = new FormData;
    formData.append('file', this.videoBlob, fileName);
    const url = 'https://backend.mozart.gives/upload.php';
    /* this.http.post(url, formData)
      .pipe(
          finalize(() => {
              loading.dismiss();
          })
      )
      .subscribe(res => {
          if (res['success']) {
              this.presentToast('File upload complete.')
          } else {
              this.presentToast('File upload failed.')
          }
      }); */
  }

}
