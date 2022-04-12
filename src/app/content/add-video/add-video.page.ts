import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ModalController, IonRouterOutlet, ToastController } from '@ionic/angular';
import { FormGroup, NgForm } from '@angular/forms';
import { CapacitorVideoPlayer, CapacitorVideoPlayerPlugin } from 'capacitor-video-player';
import { VideoService } from 'src/app/services/video.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ChooseTeacherModalPage } from '../choose-teacher-modal/choose-teacher-modal.page';

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
  
  videoLocalUrl = '';
  videoBlob: Blob;
  length: number = 0;
  videoId: string;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
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
      //get local videoUrl:
      this.videoLocalUrl = this.videoService.localStorageVideoUrl;
      this.changeDetector.detectChanges();
      console.log('Nun sollte der Player geladen werden, wenn videoUrl vorhanden: ', this.videoLocalUrl);
      ///init Video Player, Capacitor video pleyer requires base64:
      const base64dataUrl = await this.videoService.getVideoBase64Url(this.videoLocalUrl);
      console.log('video player: ', base64dataUrl);
      // Show player emebdded
    await this.videoPlayer.initPlayer({
        mode: 'embedded',
        url: base64dataUrl,
        playerId: 'player',
        componentTag: 'app-add-video'
       });
    await this.videoPlayer.getDuration({ playerId: 'player' }).then(res => {
      this.length = res.value;
    });
    console.log('is video length availabel? Not yet.', this.length);
    }
  }

  stopRecord() {
    console.log('player is initialized, start: ', this.playerIsInitialized);
    this.mediaRecorder.stop();
    this.mediaRecorder = null;
    this.captureElement.nativeElement.srcObject = null;
    this.isRecording = false;
    this.playerIsInitialized = true;
    this.changeDetector.detectChanges();
    console.log('player is initialized, end: ', this.playerIsInitialized);
  }


  //will be called by clicking button "I take this video":
  async openAlert(form: NgForm) {
    this.takeVideoStatus = true;
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    //retrieve video length from capacitor player to use it for updating firestore DB:
    await this.videoPlayer.getDuration({ playerId: 'player' }).then(res => {
      this.length = res.value;
      console.log('inside openAlert()', this.length);
      loading.dismiss();
    });
    //let user decide wether to choose a teacher now or later
    const alert = await this.alertCtrl.create({
      header: 'Choose teachers',
      //TO DO: change string (string interpolation) depending on if(friend, group or public teacher)
      message: 'Would you like to ask a friend, a group or a public teacher for feedback?',
      backdropDismiss: false,
      buttons: [{ //if user decides to choose a teacher later, go to content page:
        text: 'later',
        role: 'Cancle',
        cssClass: 'alert-class',
        handler: (value: any) => {
          console.log(form.value);
          this.videoPlayer.stopAllPlayers();
          this.chooseTeacherLater(form.value);
        }
      },
    { //if user wants to choose a teacher: open choose-teacher-modal page:
      text: 'yes',
      role: 'Cancle',
      cssClass: 'alert-class',
      handler: (value: any) => {
        this.videoPlayer.stopAllPlayers();
        this.openChooseTeacher(form.value);
      }
    }]
    });
    await alert.present(); 
  }
  
  async chooseTeacherLater(formValue: any) { //formValue from openAlert()
    console.log(formValue.title, formValue.notes, this.length, this.videoLocalUrl);
    await this.videoService.addVideo(formValue.title, formValue.notes, this.length, this.videoLocalUrl);
    this.router.navigateByUrl('home/content', {replaceUrl: true});
  }
  async openChooseTeacher(formValue: any) {
    console.log('inside openChooseTeacher, current value length', this.length);
    const modal = await this.modalCtrl.create ({
      component: ChooseTeacherModalPage,
      componentProps: {
        title: formValue.title,
        notes: formValue.notes,
        length: this.length,
        videoLocalUrl: this.videoLocalUrl
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      cssClass: 'transparent-modal' //ToDo: Check this class (global.scss)
    });
    modal.present();

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
              this.videoService.updateVideoUrl(this.videoId, `https://backend.mozart.gives/uploads/${fileName}`);
              console.log('video url created bei updateVideoUrl(): ', `https://backend.mozart.gives/uploads/${fileName}`)
          } else {
              this.presentToast('Video upload failed.');
          }
      });
  }


}
