import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ModalController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CapacitorVideoPlayer } from 'capacitor-video-player';
import { VideoService } from 'src/app/services/video.service';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.page.html',
  styleUrls: ['./add-video.page.scss'],
})
export class AddVideoPage implements OnInit {
  @ViewChild('video') captureElement: ElementRef;
  titleAndNotes: FormGroup;
  mediaRecorder: MediaRecorder;
  isRecording = false;
  videoPlayer: any;
  playerIsInitialized = false;
  takeVideoStatus = false;
  
  videoUrls = [];
  videoBlob: Blob;
  videoDate: Date;
  videoTitle: string;
  videoNotes: string;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private videoService: VideoService,
    private changeDetector: ChangeDetectorRef,
    private http: HttpClient,
    private toastCtrl: ToastController
    ) {

  }

  ngOnInit() {
    this.videoPlayer = CapacitorVideoPlayer;
    this.titleAndNotes = this.fb.group({
      title: ['', Validators.required],
      notes: ['', Validators.required], 
    });
    console.log('NgOnInit, Formgroup this.titleAndNotes, res: ', this.titleAndNotes);
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
    if (this.videoUrls.length != 0) {
      this.videoUrls = [];
    }
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
      this.videoDate = new Date();
      console.log('date: ', this.videoDate, 'date to string: ', this.videoDate.toString())
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
      componentTag: 'app-add-video'
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
  cancel() {
    this.videoUrls = [];
  }
  async takeVideo() {
    this.takeVideoStatus = true;
    //this.videoTitle = this.titleAndNotes.value;
    console.log('this.titleAndNotes.value.title: ', this.titleAndNotes.value[0]);
  }
  async uploadVideo(videoUrl) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading video...',
    });
    await loading.present();
    const fileName = 'test1.mp4';
    const formData = new FormData;
    formData.append('file', this.videoBlob, fileName);
    const url = 'https://backend.mozart.gives/upload.php';
    this.http.post(url, formData)
      .pipe(
          finalize(() => {
              loading.dismiss();
          })
      )
      .subscribe(res => {
          if (res['success']) {
              this.presentToast('Video upload complete.')
          } else {
              this.presentToast('Video upload failed.')
          }
      });
  }
  addVideo() {
    const date = serverTimestamp();
    const title = '';
    const notes = '';
    const length = '';
    const videoUrl = '';
  }

}
