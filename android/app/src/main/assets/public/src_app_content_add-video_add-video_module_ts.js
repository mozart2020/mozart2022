"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_content_add-video_add-video_module_ts"],{

/***/ 1962:
/*!***************************************************************!*\
  !*** ./src/app/content/add-video/add-video-routing.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddVideoPageRoutingModule": () => (/* binding */ AddVideoPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _add_video_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-video.page */ 9485);




const routes = [
    {
        path: '',
        component: _add_video_page__WEBPACK_IMPORTED_MODULE_0__.AddVideoPage
    }
];
let AddVideoPageRoutingModule = class AddVideoPageRoutingModule {
};
AddVideoPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], AddVideoPageRoutingModule);



/***/ }),

/***/ 317:
/*!*******************************************************!*\
  !*** ./src/app/content/add-video/add-video.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddVideoPageModule": () => (/* binding */ AddVideoPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _add_video_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-video-routing.module */ 1962);
/* harmony import */ var _add_video_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add-video.page */ 9485);







let AddVideoPageModule = class AddVideoPageModule {
};
AddVideoPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _add_video_routing_module__WEBPACK_IMPORTED_MODULE_0__.AddVideoPageRoutingModule
        ],
        declarations: [_add_video_page__WEBPACK_IMPORTED_MODULE_1__.AddVideoPage]
    })
], AddVideoPageModule);



/***/ }),

/***/ 9485:
/*!*****************************************************!*\
  !*** ./src/app/content/add-video/add-video.page.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddVideoPage": () => (/* binding */ AddVideoPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _add_video_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-video.page.html?ngResource */ 4323);
/* harmony import */ var _add_video_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add-video.page.scss?ngResource */ 5920);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var capacitor_video_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! capacitor-video-player */ 3935);
/* harmony import */ var src_app_services_video_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/video.service */ 8472);
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/auth.service */ 7556);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 8784);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 4661);
/* harmony import */ var _choose_teacher_modal_choose_teacher_modal_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../choose-teacher-modal/choose-teacher-modal.page */ 1967);












let AddVideoPage = class AddVideoPage {
    constructor(router, loadingCtrl, alertCtrl, modalCtrl, routerOutlet, videoService, authService, changeDetector, http, toastCtrl) {
        this.router = router;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.routerOutlet = routerOutlet;
        this.videoService = videoService;
        this.authService = authService;
        this.changeDetector = changeDetector;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.isRecording = false;
        this.playerIsInitialized = false;
        this.takeVideoStatus = false;
        this.videoLocalUrl = '';
        this.length = 0;
    }
    ngOnInit() {
        this.videoPlayer = capacitor_video_player__WEBPACK_IMPORTED_MODULE_2__.CapacitorVideoPlayer;
    }
    presentToast(text) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const toast = yield this.toastCtrl.create({
                message: text,
                duration: 3000,
            });
            toast.present();
        });
    }
    recordVideo() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            console.log('player is initialized: ', this.playerIsInitialized);
            const stream = yield navigator.mediaDevices.getUserMedia({
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
                    chunks.push(event.data);
                }
            };
            this.mediaRecorder.start();
            this.mediaRecorder.onstop = (event) => (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
                const videoBuffer = new Blob(chunks, { type: 'video/mp4' });
                this.videoBlob = videoBuffer;
                //Video: im internen Storage speichern:
                yield this.videoService.storeVideo(videoBuffer);
                //get local videoUrl:
                this.videoLocalUrl = this.videoService.localStorageVideoUrl;
                this.changeDetector.detectChanges();
                console.log('Nun sollte der Player geladen werden, wenn videoUrl vorhanden: ', this.videoLocalUrl);
                ///init Video Player, Capacitor video pleyer requires base64:
                const base64dataUrl = yield this.videoService.getVideoBase64Url(this.videoLocalUrl);
                console.log('video player: ', base64dataUrl);
                // Show player embedded
                yield this.videoPlayer.initPlayer({
                    mode: 'embedded',
                    url: base64dataUrl,
                    playerId: 'player',
                    componentTag: 'app-add-video'
                });
                yield this.videoPlayer.getDuration({ playerId: 'player' }).then(res => {
                    this.length = res.value;
                });
                console.log('is video length availabel? Not yet.', this.length);
            });
        });
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
    openAlert(form) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            this.takeVideoStatus = true;
            const loading = yield this.loadingCtrl.create({
                message: 'Please wait...',
            });
            yield loading.present();
            //retrieve video length from capacitor player to use it for updating firestore DB:
            yield this.videoPlayer.getDuration({ playerId: 'player' }).then(res => {
                this.length = res.value;
                console.log('inside openAlert()', this.length);
                loading.dismiss();
            });
            //let user decide wether to choose a teacher now or later
            const alert = yield this.alertCtrl.create({
                header: 'Choose teachers',
                //TO DO: change string (string interpolation) depending on if(friend, group or public teacher)
                message: 'Would you like to ask a friend, a group or a public teacher for feedback?',
                backdropDismiss: false,
                buttons: [{
                        text: 'later',
                        role: 'Cancle',
                        cssClass: 'alert-class',
                        handler: (value) => {
                            console.log(form.value);
                            this.videoPlayer.stopAllPlayers();
                            this.chooseTeacherLater(form.value);
                        }
                    },
                    {
                        text: 'yes',
                        role: 'Cancle',
                        cssClass: 'alert-class',
                        handler: (value) => {
                            this.videoPlayer.stopAllPlayers();
                            this.openChooseTeacher(form.value);
                        }
                    }]
            });
            yield alert.present();
        });
    }
    chooseTeacherLater(formValue) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            console.log(formValue.title, formValue.notes, this.length, this.videoLocalUrl);
            yield this.videoService.addVideo(formValue.title, //title
            formValue.notes, //notes
            this.length, //length
            this.videoLocalUrl, //videoLocalUrl => local device storage
            ''); //videoUrl => backend storage (https), updated after video upload
            this.uploadVideo();
            this.router.navigateByUrl('home/content', { replaceUrl: true });
        });
    }
    openChooseTeacher(formValue) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            console.log('inside openChooseTeacher, current value length', this.length);
            const modal = yield this.modalCtrl.create({
                component: _choose_teacher_modal_choose_teacher_modal_page__WEBPACK_IMPORTED_MODULE_5__.ChooseTeacherModalPage,
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
        });
    }
    //Upload section:
    uploadVideo() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const loading = yield this.loadingCtrl.create({
                message: 'Uploading video...',
            });
            yield loading.present();
            const userId = this.authService.getCurrentUserId();
            const date = new Date().getTime();
            const fileName = `${userId}_${date}.mp4`;
            const formData = new FormData;
            formData.append('file', this.videoBlob, fileName);
            const url = 'https://backend.mozart.gives/upload.php';
            this.http.post(url, formData)
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.finalize)(() => {
                loading.dismiss();
                this.router.navigateByUrl('/home/content', { replaceUrl: true });
            }))
                .subscribe(res => {
                if (res['success']) {
                    this.presentToast('Video upload complete.');
                    this.videoService.updateVideoUrl(this.videoId, `https://backend.mozart.gives/uploads/${fileName}`);
                    console.log('video url created bei updateVideoUrl(): ', `https://backend.mozart.gives/uploads/${fileName}`, 'videoId: ', this.videoId);
                }
                else {
                    this.presentToast('Video upload failed.');
                }
            });
        });
    }
};
AddVideoPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__.Router },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.LoadingController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.AlertController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonRouterOutlet },
    { type: src_app_services_video_service__WEBPACK_IMPORTED_MODULE_3__.VideoService },
    { type: src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_4__.AuthService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ChangeDetectorRef },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClient },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ToastController }
];
AddVideoPage.propDecorators = {
    captureElement: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['video',] }]
};
AddVideoPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
        selector: 'app-add-video',
        template: _add_video_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_add_video_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], AddVideoPage);



/***/ }),

/***/ 6409:
/*!*********************************************************************!*\
  !*** ./node_modules/capacitor-video-player/dist/esm/definitions.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 3935:
/*!***************************************************************!*\
  !*** ./node_modules/capacitor-video-player/dist/esm/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CapacitorVideoPlayer": () => (/* binding */ CapacitorVideoPlayer)
/* harmony export */ });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ 5099);
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./definitions */ 6409);

const CapacitorVideoPlayer = (0,_capacitor_core__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('CapacitorVideoPlayer', {
    web: () => __webpack_require__.e(/*! import() */ "node_modules_capacitor-video-player_dist_esm_web_js").then(__webpack_require__.bind(__webpack_require__, /*! ./web */ 9910)).then(m => new m.CapacitorVideoPlayerWeb()),
});




/***/ }),

/***/ 5920:
/*!******************************************************************!*\
  !*** ./src/app/content/add-video/add-video.page.scss?ngResource ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = ".video {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZC12aWRlby5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0FBQ0oiLCJmaWxlIjoiYWRkLXZpZGVvLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi52aWRlbyB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiJdfQ== */";

/***/ }),

/***/ 4323:
/*!******************************************************************!*\
  !*** ./src/app/content/add-video/add-video.page.html?ngResource ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"home/content\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title>Add video</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <ion-fab *ngIf=\"isRecording\" vertical=\"top\" horizontal=\"center\" slot=\"fixed\">\r\n    <ion-fab-button \r\n    (click)=\"stopRecord()\" \r\n    color=\"danger\"\r\n    style=\"opacity: 0.9;\">\r\n      <ion-icon name=\"stop\"></ion-icon>\r\n    </ion-fab-button>\r\n  </ion-fab>\r\n  <!-- Display the video stream while capturing -->\r\n  <hr>\r\n  <ion-label *ngIf=\"isRecording\" color=\"danger\"><h2>...is recording</h2></ion-label>\r\n  <video class=\"video\" #video autoplay playsinline muted [hidden]=\"!isRecording\"></video>\r\n\r\n \r\n  <!-- Neccessary for the video player -->\r\n  <div id=\"player\"></div>\r\n \r\n  <div *ngIf=\"playerIsInitialized\">\r\n    <form #titleAndNotes=\"ngForm\" (ngSubmit)=\"openAlert(titleAndNotes)\">\r\n      <ion-item>\r\n        <ion-label>Title:</ion-label>\r\n        <ion-input\r\n          type=\"text\"\r\n          ngModel\r\n          name=\"title\"\r\n          placeholder=\"Give your video a title\"\r\n          required\r\n          minlength=\"2\"\r\n          #title=\"ngModel\"></ion-input>\r\n      </ion-item>\r\n      <ion-item>\r\n        <ion-label>Notes:</ion-label>\r\n        <ion-textarea rows=\"2\"\r\n          type=\"text\"\r\n          ngModel\r\n          name=\"notes\"\r\n          placeholder=\"Comment on your video\"\r\n          maxlength=\"600\"></ion-textarea>\r\n      </ion-item>\r\n      <ion-button\r\n          type=\"submit\"\r\n          [disabled]=\"!titleAndNotes.valid\"\r\n          expand=\"block\"\r\n          color=\"secondary\">I take this video!</ion-button>\r\n    </form>    \r\n  </div>\r\n  <hr>\r\n  <ion-row *ngIf=\"!playerIsInitialized || !isRecording\">\r\n    <ion-col size=\"6\">\r\n      <ion-button\r\n        size=\"small\"\r\n        expand=\"block\"      \r\n        routerLink=\"../content\">Cancel</ion-button>    \r\n    </ion-col>\r\n    <ion-col size=\"6\">\r\n      <ion-button\r\n        size=\"small\"\r\n        expand=\"block\"\r\n        color=\"danger\"\r\n        (click)=\"recordVideo()\">Record new video</ion-button>\r\n    </ion-col>\r\n  </ion-row>\r\n</ion-content>\r\n\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_content_add-video_add-video_module_ts.js.map