import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CapacitorVideoPlayer } from 'capacitor-video-player';
import { VideoService } from 'src/app/services/video.service';
import { AuthService } from 'src/app/services/auth.service';
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
  date: any;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private videoService: VideoService,
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef,
    private http: HttpClient,
    private toastCtrl: ToastController
    ) {

  }

  ngOnInit() {
    this.videoPlayer = CapacitorVideoPlayer;
    this.titleAndNotes = new FormGroup({
      title: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.required)
    });
    console.log('NgOnInit, this.titleAndNotes ', this.titleAndNotes);
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
  cancel() {
    this.videoUrls = [];
  }
  addVideo() {
    this.takeVideoStatus = true;
    this.date = serverTimestamp();
    const title = this.titleAndNotes.get('title').value;
    const notes = this.titleAndNotes.get('notes').value;
    this.videoService.addVideo(this.date, title, notes);
    this.uploadVideo();
  }
  
  //Upload section:
  async uploadVideo() {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading video...',
    });
    await loading.present();
    const mail = this.authService.getCurrentUserEmail();
    const date = new Date().getTime();
    const fileName = `${mail}_${date}.mp4`;
    const formData = new FormData;
    formData.append('file', this.videoBlob, fileName);
    const url = 'https://backend.mozart.gives/upload.php';
    this.http.post(url, formData)
      .pipe(
          finalize(() => {
              loading.dismiss();
              this.router.navigateByUrl('/home/content', { replaceUrl: true });
          })
      )
      .subscribe(res => {
          if (res['success']) {
              this.presentToast('Video upload complete.');
              this.videoService.updateVideoUrl(`https://backend.mozart.gives/uploads/${fileName}`);
              console.log('video url created bei updateVideoUrl(): ', `https://backend.mozart.gives/uploads/${fileName}`)
          } else {
              this.presentToast('Video upload failed.');
          }
      });
  }


}
