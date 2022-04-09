import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { FormGroup, NgForm } from '@angular/forms';
import { CapacitorVideoPlayer, CapacitorVideoPlayerPlugin } from 'capacitor-video-player';
import { VideoService } from 'src/app/services/video.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { serverTimestamp } from 'firebase/firestore';

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
  videoPlayer: CapacitorVideoPlayerPlugin;
  playerIsInitialized = false;
  takeVideoStatus = false;
  
  videoUrls = [];
  videoUrl = '';
  videoBlob: Blob;
  length: number = 0;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private videoService: VideoService,
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef,
    private http: HttpClient,
    private toastCtrl: ToastController
    ) {

  }

  ngOnInit() {
    this.videoPlayer = CapacitorVideoPlayer;
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
    const options = { mimeType: 'video/mp4' };
    this.mediaRecorder = new MediaRecorder(stream, options);
    let chunks = [];
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunks.push(event.data)
      }
    }
    this.mediaRecorder.start();
    this.mediaRecorder.onstop = async (event) => {
      const videoBuffer = new Blob(chunks, { type: 'video/mp4' });
      this.videoBlob = videoBuffer;
      //Video: im internen Storage speichern:
      await this.videoService.storeVideo(videoBuffer);      
      // Videoarray erneuern:
      const videoUrls = this.videoService.videos;
      this.videoUrls = videoUrls;
      const videoUrl = videoUrls.forEach(value => {
        console.log('inside forEach: ', value);
        this.videoUrl = value;
      })
      console.log('Video in modal page: ', this.videoUrls);
      this.changeDetector.detectChanges();
      console.log('Nun sollte der Player geladen werden, wenn videoUrl vorhanden: ', this.videoUrl);
      ///init Video Player:
      const base64dataUrl = await this.videoService.getVideoBase64Url(this.videoUrl);
      console.log('video player: ', base64dataUrl);
      // Show player emebdded
    await this.videoPlayer.initPlayer({
        mode: 'embedded',
        url: base64dataUrl,
        playerId: 'player',
        componentTag: 'app-add-video'
       });
    console.log('is video length availabel? ', this.length);
    }
  }

  /* async playVideo() {
    console.log('inside playVideo: ', this.videoUrl);
    const base64dataUrl = await this.videoService.getVideoBase64Url(this.videoUrl);
    console.log('video player: ', base64dataUrl);
    // Show player emebdded
    await this.videoPlayer.initPlayer({
      mode: 'embedded',
      url: base64dataUrl,
      playerId: 'player',
      componentTag: 'app-add-video'
    });
    //get video length from player for DB:
    console.log('is player initialized? ', )
    this.videoPlayer.getDuration({ playerId: 'player' })
    .then(res => {
      this.length = res.value;
    });    
  } */
  getDurationFromPlayer() {
    this.videoPlayer.getDuration({ playerId: 'player' }).
    then(res => {
      this.length = res.value;
      console.log('getFromPlayer', res.value, this.length);
      return res.value;
    });
  }
  stopRecord() {
    console.log('player is initialized, start: ', this.playerIsInitialized);
    this.mediaRecorder.stop();
    this.mediaRecorder = null;
    this.captureElement.nativeElement.srcObject = null;
    this.isRecording = false;
    this.playerIsInitialized = true;
    console.log('player is initialized, end: ', this.playerIsInitialized);
  }
  cancel() {
    this.videoUrls = [];
  }

  async openAlert(form: NgForm) {
    this.takeVideoStatus = true;
    const length = await this.videoPlayer.getDuration({ playerId: 'player' }).then(res => {
      return res.value;
    }).catch(err => {
      console.log('catch', err.value);
    });
    this.length = length
    console.log('current value length after getDuration()', this.length);
    const alert = await this.alertCtrl.create({
      header: 'Choose teachers',
      //TO DO: change string (string interpolation) depending on if(friend, group or public teacher)
      message: 'Would you like to ask a friend, a group or a public teacher for feedback?',
      backdropDismiss: false,
      buttons: [{
        text: 'later',
        role: 'Cancle',
        cssClass: 'alert-class',
        handler: (value: any) => {}
      },
    {
      text: 'yes',
      role: 'Cancle',
      cssClass: 'alert-class',
      handler: (value: any) => {
        this.openChooseTeacher()
      }
    }]
    });
    await alert.present();
    //this.videoService.addVideo(title, notes, this.length);
    //this.uploadVideo();
  }
  openChooseTeacher() {
    console.log('inside openChooseTeacher, current value length', this.length);
  }
  getDuration() {
    console.log(this.length);
  }
  
  //Upload section:
  async uploadVideo() {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading video...',
    });
    await loading.present();
    const userId = this.authService.getCurrentUserId();
    const date = new Date().getTime();
    const fileName = `${userId}_${date}.mp4`;
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
