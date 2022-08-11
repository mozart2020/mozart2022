"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_content_example-detail_example-detail_module_ts"],{

/***/ 6052:
/*!*************************************************************************!*\
  !*** ./src/app/content/example-detail/example-detail-routing.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExampleDetailPageRoutingModule": () => (/* binding */ ExampleDetailPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _example_detail_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./example-detail.page */ 1129);




const routes = [
    {
        path: '',
        component: _example_detail_page__WEBPACK_IMPORTED_MODULE_0__.ExampleDetailPage
    }
];
let ExampleDetailPageRoutingModule = class ExampleDetailPageRoutingModule {
};
ExampleDetailPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ExampleDetailPageRoutingModule);



/***/ }),

/***/ 1640:
/*!*****************************************************************!*\
  !*** ./src/app/content/example-detail/example-detail.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExampleDetailPageModule": () => (/* binding */ ExampleDetailPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _example_detail_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./example-detail-routing.module */ 6052);
/* harmony import */ var _example_detail_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./example-detail.page */ 1129);







let ExampleDetailPageModule = class ExampleDetailPageModule {
};
ExampleDetailPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _example_detail_routing_module__WEBPACK_IMPORTED_MODULE_0__.ExampleDetailPageRoutingModule
        ],
        declarations: [_example_detail_page__WEBPACK_IMPORTED_MODULE_1__.ExampleDetailPage]
    })
], ExampleDetailPageModule);



/***/ }),

/***/ 1129:
/*!***************************************************************!*\
  !*** ./src/app/content/example-detail/example-detail.page.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExampleDetailPage": () => (/* binding */ ExampleDetailPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _example_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./example-detail.page.html?ngResource */ 3808);
/* harmony import */ var _example_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./example-detail.page.scss?ngResource */ 2105);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);




let ExampleDetailPage = class ExampleDetailPage {
    constructor() {
        //to control the timeline of student video
        this.timeline = "0%"; //controls width of timeline-div
        this.html5Controls = true;
        //fo set position of feedback markers (width of respective div-tags):
        this.timelineMarker01 = "22%";
        this.timelineMarker02 = "51%";
        this.timelineMarker03 = "75%";
        // marker01Background: string = ''; --maybe some action
        // marker02Background: string = '';   wenn timeline
        // marker03Background: string = '';   passes marker
        //cotroll buttons disabled:
        this.goToBeginButton = false;
        this.backwardButton = false;
        this.playPauseButton = false;
        this.forwardButton = false;
        //switch play/pause button:
        this.playButtonStatus = true;
        //play buttons feedback videos disabled:
        /*  playBtn01Disabled: boolean = true;
         playBtn02Disabled: boolean = true;
         playBtn03Disabled: boolean = true; */
        this.feedbackInfo01Status = "feedbackInfoInactive";
        this.feedbackInfo02Status = "feedbackInfoInactive";
        this.feedbackInfo03Status = "feedbackInfoInactive";
        //für *ngIf in den Feedback-Info-Divs
        //zum Hiden der anderen Feedbacks
        //wenn ein ein Feedbackvideo angesehen wird
        this.feedbackInfo01Visible = true;
        this.feedbackInfo02Visible = true;
        this.feedbackInfo03Visible = true;
        //für *ngIf in den Videotags der Feedback Videos:  
        this.feedbackVideo01Visible = false;
        this.feedbackVideo02Visible = false;
        this.feedbackVideo03Visible = false;
    }
    ngOnInit() {
    }
    //Timeline des student videos:
    onTimeUpdate(event) {
        this.timeline = `${ //property timeline ist die width in % des Timeline-Divs
        this.studentVideo.nativeElement.currentTime
            / this.studentVideo.nativeElement.duration
            * 100}%`;
        /* ---eventuell goToBeginButton bei currentTime == ca. 0 disabeln
            ---!!! bug-spoiler-alarm, didn't really work:
        if (this.studentVideo.nativeElement.currentTime > 0.3
            && this.goToBeginButton == true) {
          this.goToBeginButton = false;
        } else if (this.studentVideo.nativeElement.currentTime < 0.3
            && this.goToBeginButton ==false) {
          this.goToBeginButton = true;
        }*/
        /*maybe:if timeline of student video passes marker, background will be filled:
          //maybe animated with fade in transpaerncy
          //or play button will be activated:
       if (this.studentVideo.nativeElement.currentTime > 11
           && this.studentVideo.nativeElement.currentTime < 13) {
           console.log('marker passed');
           this.playBtn01Disabled = false;
         } else {
           this.playBtn01Disabled = true;
         }
       if (this.studentVideo.nativeElement.currentTime > 27
           && this.studentVideo.nativeElement.currentTime < 29) {
           console.log('marker passed');
           this.playBtn02Disabled = false;
         } else {
           this.playBtn02Disabled = true;
         }
         if (this.studentVideo.nativeElement.currentTime > 40
           && this.studentVideo.nativeElement.currentTime < 42) {
           console.log('marker passed');
           this.playBtn03Disabled = false;
         } else {
           this.playBtn03Disabled = true;
         }*/
    }
    //control buttons begin
    playPauseStudentVideo() {
        if (this.studentVideo.nativeElement.paused == true) {
            this.studentVideo.nativeElement.play();
            console.log(this.studentVideo.nativeElement.duration);
            //this.cleanEnabledPlayBtns();
            this.cleanFeedbackInfoStatus();
        }
        else {
            this.studentVideo.nativeElement.pause();
            console.log(this.studentVideo.nativeElement.duration);
            //this.cleanEnabledPlayBtns();  
            this.cleanFeedbackInfoStatus();
        }
    }
    backwardStudentVideo() {
        if (this.studentVideo.nativeElement.currentTime < 5.5) {
            this.studentVideo.nativeElement.currentTime = 0;
        }
        else {
            this.studentVideo.nativeElement.currentTime -= 5;
            //this.cleanEnabledPlayBtns();
            this.cleanFeedbackInfoStatus();
        }
    }
    forwardStudentVideo() {
        if (this.studentVideo.nativeElement.currentTime
            > this.studentVideo.nativeElement.duration - 5.5) {
            this.studentVideo.nativeElement.currentTime
                = this.studentVideo.nativeElement.duration;
        }
        else {
            this.studentVideo.nativeElement.currentTime += 5;
            //this.cleanEnabledPlayBtns();
            this.cleanFeedbackInfoStatus();
        }
    }
    disableControlButtons() {
        this.goToBeginButton = true;
        this.backwardButton = true;
        this.playPauseButton = true;
        this.forwardButton = true;
    }
    enableControlButtons() {
        this.goToBeginButton = false;
        this.backwardButton = false;
        this.playPauseButton = false;
        this.forwardButton = false;
    }
    goToBeginStudentVideo() {
        this.studentVideo.nativeElement.currentTime = 0;
        //this.cleanEnabledPlayBtns();
        this.cleanFeedbackInfoStatus();
    }
    //control buttons end
    /* cleanEnabledPlayBtns() {
      if(this.playBtn01Disabled == false) {
        this.playBtn01Disabled = true;
      }
      if(this.playBtn02Disabled == false) {
        this.playBtn02Disabled = true;
      }
      if(this.playBtn03Disabled == false) {
        this.playBtn03Disabled = true;
      }
    } */
    cleanFeedbackInfoStatus() {
        if (this.feedbackInfo01Status == "feedbackInfo") {
            this.feedbackInfo01Status = "feedbackInfoInactive";
        }
        if (this.feedbackInfo02Status == "feedbackInfo") {
            this.feedbackInfo02Status = "feedbackInfoInactive";
        }
        if (this.feedbackInfo03Status == "feedbackInfo") {
            this.feedbackInfo03Status = "feedbackInfoInactive";
        }
    }
    //in case student video is playing, it should be stopped when playing a playback video:
    //Pause Feebackvideos if playing
    stopPlayingFeedbackVideo01() {
        if (this.feedbackVideo01.nativeElement.paused == false) {
            this.feedbackVideo01.nativeElement.pause();
        }
    }
    stopPlayingFeedbackVideo02() {
        if (this.feedbackVideo02.nativeElement.paused == false) {
            this.feedbackVideo02.nativeElement.pause();
        }
    }
    stopPlayingFeedbackVideo03() {
        if (this.feedbackVideo03.nativeElement.paused == false) {
            this.feedbackVideo03.nativeElement.pause();
        }
    }
    //first check if video-tag is there, then pause video if playing
    stopPlayingFeedbackVideos() {
        if (this.feedbackInfo01Visible == true) {
            this.stopPlayingFeedbackVideo01();
        }
        if (this.feedbackVideo02Visible == true) {
            this.stopPlayingFeedbackVideo02();
        }
        if (this.feedbackInfo03Visible == true) {
            this.stopPlayingFeedbackVideo03();
        }
    }
    onPlayStudentVideo() {
        this.playButtonStatus = false;
        if (this.feedbackVideo01Visible == false && this.feedbackVideo02Visible == false && this.feedbackVideo03Visible == false) {
            //this.cleanEnabledPlayBtns();
            this.cleanFeedbackInfoStatus();
        } //if a feedback video is open, of course Button should not be disabled
        this.stopPlayingFeedbackVideos();
    }
    onPauseStudentVideo() {
        this.playButtonStatus = true;
    }
    //in case a playback video is playing, it should be stopped when playing the student video:
    onPlayFeedbackVideo() {
        this.stopPlayingStudentVideo();
    }
    stopPlayingStudentVideo() {
        if (this.studentVideo.nativeElement.paused == false) {
            this.studentVideo.nativeElement.pause();
        }
    }
    /////Event "seeking" inkludiert auch das Setzen der Timline in chooseFeedback()
    ////daher: die Funktion cleanEnablePlayBtns()
    ///        durch onSeekingStudentVideo() ersetzen (asynchron mit await)
    // onSeekingStudentVideo() {
    //   if(this.studentVideo.nativeElement.currentTime == 12
    //     || this.studentVideo.nativeElement.currentTime == 28
    //     || this.studentVideo.nativeElement.currentTime == 41){
    //   } else {
    //     this.cleanEnabledPlayBtns();
    //   }
    // }
    //Funktionen für Feedback 1
    chooseFeedback01() {
        //this.cleanEnabledPlayBtns();
        this.cleanFeedbackInfoStatus();
        this.stopPlayingStudentVideo();
        //this.playBtn01Disabled = false;
        this.timeline = '22%';
        this.studentVideo.nativeElement.currentTime = 12;
        this.feedbackInfo01Status = "feedbackInfo";
    }
    openCloseFeedbackVideo01() {
        if (this.feedbackVideo01Visible == false) {
            this.feedbackVideo01Visible = true;
            this.feedbackInfo02Visible = false;
            this.feedbackInfo03Visible = false;
            this.disableControlButtons();
            this.html5Controls = false;
        }
        else {
            this.stopPlayingStudentVideo();
            this.feedbackVideo01Visible = false;
            this.feedbackInfo02Visible = true;
            this.feedbackInfo03Visible = true;
            this.enableControlButtons();
            this.html5Controls = true;
        }
    }
    //Funktionen für Feedback 2
    chooseFeedback02() {
        //this.cleanEnabledPlayBtns();
        this.cleanFeedbackInfoStatus();
        this.stopPlayingStudentVideo();
        //this.playBtn02Disabled = false;
        this.timeline = '51%';
        this.studentVideo.nativeElement.currentTime = 28;
        this.feedbackInfo02Status = "feedbackInfo";
    }
    openCloseFeedbackVideo02() {
        if (this.feedbackVideo02Visible == false) {
            this.feedbackVideo02Visible = true;
            this.feedbackInfo01Visible = false;
            this.feedbackInfo03Visible = false;
            this.disableControlButtons();
            this.html5Controls = false;
        }
        else {
            this.stopPlayingStudentVideo();
            this.feedbackVideo02Visible = false;
            this.feedbackInfo01Visible = true;
            this.feedbackInfo03Visible = true;
            this.enableControlButtons();
            this.html5Controls = true;
        }
    }
    //Funktionen für Feedback 3
    chooseFeedback03() {
        //this.cleanEnabledPlayBtns();
        this.cleanFeedbackInfoStatus();
        this.stopPlayingStudentVideo();
        //this.playBtn03Disabled = false;
        this.timeline = '75%';
        this.studentVideo.nativeElement.currentTime = 41;
        this.feedbackInfo03Status = "feedbackInfo";
    }
    openCloseFeedbackVideo03() {
        if (this.feedbackVideo03Visible == false) {
            this.feedbackVideo03Visible = true;
            this.feedbackInfo01Visible = false;
            this.feedbackInfo02Visible = false;
            this.disableControlButtons();
            this.html5Controls = false;
        }
        else {
            this.stopPlayingStudentVideo();
            this.feedbackVideo03Visible = false;
            this.feedbackInfo01Visible = true;
            this.feedbackInfo02Visible = true;
            this.enableControlButtons();
            this.html5Controls = true;
        }
    }
};
ExampleDetailPage.ctorParameters = () => [];
ExampleDetailPage.propDecorators = {
    studentVideo: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ViewChild, args: ['studentVideo',] }],
    feedbackVideo01: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ViewChild, args: ['feedbackVideo01',] }],
    feedbackVideo02: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ViewChild, args: ['feedbackVideo02',] }],
    feedbackVideo03: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ViewChild, args: ['feedbackVideo03',] }]
};
ExampleDetailPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-example-detail',
        template: _example_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_example_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ExampleDetailPage);



/***/ }),

/***/ 2105:
/*!****************************************************************************!*\
  !*** ./src/app/content/example-detail/example-detail.page.scss?ngResource ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = ".control-bar {\n  padding-top: 0px;\n  padding-bottom: 0px;\n  margin-top: 0px;\n  margin-bottom: 0px;\n}\n\n.timeline {\n  height: 0.5rem;\n  background-color: #78cdf5;\n  margin-bottom: 0.1rem;\n}\n\n.timeMarker {\n  text-align: end;\n  -webkit-text-decoration-style: solid;\n          text-decoration-style: solid;\n}\n\n.timeMarkerMargin {\n  margin: 0;\n  padding: 0;\n  background-color: azure;\n}\n\n.feedbackInfoTopMargin {\n  border-top-style: solid;\n  border-top-color: #78cdf5;\n  border-top-width: 0.1rem;\n}\n\n.feedbackInfo {\n  background-color: azure;\n  margin: 0;\n  padding: 0;\n}\n\n.feedbackInfoInactive {\n  opacity: 0.5;\n  background-color: azure;\n  margin: 0;\n  padding: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4YW1wbGUtZGV0YWlsLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFDSjs7QUFFQTtFQUNJLGNBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0FBQ0o7O0FBQ0E7RUFDSSxlQUFBO0VBQ0Esb0NBQUE7VUFBQSw0QkFBQTtBQUVKOztBQUFBO0VBQ0ksU0FBQTtFQUNBLFVBQUE7RUFDQSx1QkFBQTtBQUdKOztBQUFBO0VBQ0ksdUJBQUE7RUFDQSx5QkFBQTtFQUNBLHdCQUFBO0FBR0o7O0FBQUE7RUFDSSx1QkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0FBR0o7O0FBREE7RUFDSSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQUlKIiwiZmlsZSI6ImV4YW1wbGUtZGV0YWlsLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250cm9sLWJhciB7XHJcbiAgICBwYWRkaW5nLXRvcDogMHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDBweDtcclxuICAgIG1hcmdpbi10b3A6IDBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDBweDtcclxufVxyXG5cclxuLnRpbWVsaW5lIHtcclxuICAgIGhlaWdodDogMC41cmVtO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEyMCwgMjA1LCAyNDUpO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMC4xcmVtO1xyXG59XHJcbi50aW1lTWFya2VyIHtcclxuICAgIHRleHQtYWxpZ246IGVuZDtcclxuICAgIHRleHQtZGVjb3JhdGlvbi1zdHlsZTogc29saWQ7XHJcbn1cclxuLnRpbWVNYXJrZXJNYXJnaW4ge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGF6dXJlO1xyXG59XHJcblxyXG4uZmVlZGJhY2tJbmZvVG9wTWFyZ2luIHtcclxuICAgIGJvcmRlci10b3Atc3R5bGU6IHNvbGlkO1xyXG4gICAgYm9yZGVyLXRvcC1jb2xvcjogcmdiKDEyMCwgMjA1LCAyNDUpO1xyXG4gICAgYm9yZGVyLXRvcC13aWR0aDogMC4xcmVtO1xyXG59XHJcblxyXG4uZmVlZGJhY2tJbmZvIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGF6dXJlO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxufVxyXG4uZmVlZGJhY2tJbmZvSW5hY3RpdmUge1xyXG4gICAgb3BhY2l0eTogMC41O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXp1cmU7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG59Il19 */";

/***/ }),

/***/ 3808:
/*!****************************************************************************!*\
  !*** ./src/app/content/example-detail/example-detail.page.html?ngResource ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"home/content\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title>Example video</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n<!--student video:-->\r\n<video\r\n  #studentVideo\r\n  src=\"https://video.mozart.gives/student.mp4\"\r\n  width=\"100%\"\r\n  playsinline\r\n  class=\"video\"\r\n  [controls]=\"html5Controls\"\r\n  (play)=\"onPlayStudentVideo()\"\r\n  (pause)=\"onPauseStudentVideo()\"\r\n  (timeupdate)=\"onTimeUpdate($event)\">\r\n</video>\r\n<!--Controls-->\r\n<ion-grid class=\"control-bar\">\r\n<ion-row>\r\n  <ion-col class=\"control-bar\">\r\n    <ion-button \r\n      size=\"small\" \r\n        color=\"dark\" \r\n          [disabled]=\"goToBeginButton\"\r\n          (click)=\"goToBeginStudentVideo()\">          \r\n      <ion-icon name=\"play-skip-back-outline\"></ion-icon>\r\n    </ion-button>  \r\n  </ion-col>\r\n  <ion-col class=\"control-bar\">\r\n    <ion-button \r\n      size=\"small\" \r\n        color=\"dark\"\r\n        [disabled]=\"backwardButton\" \r\n        (click)=\"backwardStudentVideo()\">          \r\n      <ion-icon name=\"play-back-circle-outline\"></ion-icon>\r\n      -5\r\n    </ion-button>  \r\n  </ion-col>\r\n  <ion-col class=\"ion-text-center control-bar\">\r\n    <ion-button \r\n      size=\"small\" \r\n      color=\"dark\" \r\n      [disabled]=\"playPauseButton\" \r\n      (click)=\"playPauseStudentVideo()\">\r\n      <ion-icon [name]=\"playButtonStatus ? 'play-outline' : 'pause-outline'\"></ion-icon>\r\n    </ion-button> \r\n  </ion-col>\r\n  <ion-col class=\"ion-text-end control-bar\">\r\n    <ion-button \r\n      size=\"small\" \r\n      color=\"dark\" \r\n      [disabled]=\"forwardButton\" \r\n      (click)=\"forwardStudentVideo()\">\r\n      +5\r\n      <ion-icon name=\"play-forward-circle-outline\"></ion-icon>           \r\n    </ion-button>   \r\n  </ion-col>       \r\n</ion-row>\r\n</ion-grid>\r\n<!--timeline-->\r\n<div class=\"timeline\"[style.width]=\"timeline\"></div>\r\n<!--feedback 1-->\r\n<!--feedback 1 info-->\r\n<div *ngIf=\"feedbackInfo01Visible\">\r\n<ion-grid class=\"feedbackInfoTopMargin\" (click)=\"chooseFeedback01()\">\r\n<ion-row [style.width]=\"timelineMarker01\" class = \"timeMarkerMargin\">\r\n  <ion-col class=\"timeMarker timeMarkerMargin\">\r\n    <strong>0:12 </strong>\r\n    <ion-icon name=\"arrow-up\"></ion-icon>\r\n  </ion-col>\r\n</ion-row>\r\n<!--Play Button 1-->\r\n<ion-row [class]=\"feedbackInfo01Status\" class=\"ion-align-items-start\">\r\n  <ion-col size=\"2\">\r\n    <ion-button \r\n      size=\"small\" \r\n      color=\"dark\" \r\n      (click)=\"openCloseFeedbackVideo01()\">\r\n      <ion-icon slot=\"start\" [name]=\"feedbackVideo01Visible ? 'arrow-back' : 'play'\"></ion-icon>\r\n    </ion-button>\r\n  </ion-col>\r\n  <ion-col size=\"8\">\r\n    <strong>Renate Holm</strong>\r\n    <br>Some thoughts about your timbre.\r\n  </ion-col>\r\n  <ion-col class=\"ion-align-self-end\">\r\n    <ion-img src=\"https://video.mozart.gives/thmb_FB1.jpg\"></ion-img>\r\n  </ion-col>\r\n</ion-row>\r\n</ion-grid>\r\n</div>\r\n<!--feedback 1 video:-->\r\n<video\r\n#feedbackVideo01\r\n*ngIf=\"feedbackVideo01Visible\"\r\nsrc=\"https://video.mozart.gives/feedback-1.mp4\"\r\nwidth=\"100%\"\r\ncontrols\r\nautoplay\r\nplaysinline\r\n(play)=\"onPlayFeedbackVideo()\"></video>\r\n\r\n<!--feedback 2-->\r\n<!--feedback 2 info-->\r\n<div *ngIf=\"feedbackInfo02Visible\">\r\n<ion-grid class=\"feedbackInfoTopMargin\" (click)=\"chooseFeedback02()\">\r\n<ion-row [style.width]=\"timelineMarker02\" class = \"timeMarkerMargin\">\r\n <ion-col class=\"timeMarker timeMarkerMargin\">\r\n  <strong>0:28 </strong>\r\n    <ion-icon name=\"arrow-up\"></ion-icon>\r\n </ion-col>\r\n</ion-row>\r\n<!--Play Button 2-->\r\n<ion-row [class]=\"feedbackInfo02Status\" class=\"ion-align-items-start\">\r\n<ion-col size=\"2\" class=\"play-return-button\">\r\n  <ion-button \r\n    size=\"small\" \r\n    color=\"dark\" \r\n    (click)=\"openCloseFeedbackVideo02()\">\r\n    <ion-icon slot=\"start\" [name]=\"feedbackVideo02Visible ? 'arrow-back' : 'play'\"></ion-icon>\r\n  </ion-button>\r\n</ion-col>\r\n <ion-col size=\"8\">\r\n   <strong>Nicola Howes</strong>\r\n   <br>Relax your shoulders!\r\n </ion-col>\r\n <ion-col class=\"ion-align-self-end\">\r\n   <ion-img src=\"https://video.mozart.gives/thmb_FB2.jpg\"></ion-img>\r\n </ion-col>\r\n</ion-row>\r\n</ion-grid>\r\n</div>\r\n<!--feedback 2 video-->  \r\n<video\r\n#feedbackVideo02\r\n*ngIf=\"feedbackVideo02Visible\"\r\nsrc=\"https://video.mozart.gives/feedback-2.mp4\"\r\nwidth=\"100%\"\r\ncontrols\r\nautoplay\r\nplaysinline\r\n(play)=\"onPlayFeedbackVideo()\"></video>\r\n\r\n<!--feedback 3-->\r\n<!--feedback 3 info-->\r\n<div *ngIf=\"feedbackInfo03Visible\">   \r\n<ion-grid class=\"feedbackInfoTopMargin\" (click)=\"chooseFeedback03()\">\r\n  <ion-row [style.width]=\"timelineMarker03\" class = \"timeMarkerMargin\">\r\n    <ion-col class=\"timeMarker timeMarkerMargin\">\r\n      <strong>0:41</strong>\r\n      <ion-icon name=\"arrow-up\"></ion-icon>\r\n    </ion-col>\r\n  </ion-row>\r\n  <!--Play Button 3-->\r\n  <ion-row [class]=\"feedbackInfo03Status\" class=\"ion-align-items-start\">\r\n    <ion-col size=\"2\" class=\"play-return-button\">\r\n      <ion-button \r\n        size=\"small\" \r\n        color=\"dark\" \r\n        (click)=\"openCloseFeedbackVideo03()\">\r\n        <ion-icon slot=\"start\" [name]=\"feedbackVideo03Visible ? 'arrow-back' : 'play'\"></ion-icon>\r\n      </ion-button>\r\n    </ion-col>\r\n    <ion-col size=\"8\">\r\n      <strong>Yana Korosha</strong>\r\n      <br>I've got some very helpful exercises for you!\r\n    </ion-col>\r\n    <ion-col class=\"ion-align-self-end\">\r\n      <ion-img src=\"https://video.mozart.gives/thmb_FB3.jpg\"></ion-img>\r\n    </ion-col>\r\n  </ion-row>\r\n</ion-grid>\r\n</div>\r\n<!--feedback 3 video-->  \r\n<video\r\n#feedbackVideo03\r\n*ngIf=\"feedbackVideo03Visible\"\r\nsrc=\"https://video.mozart.gives/feedback-3.mp4\"\r\nwidth=\"100%\"\r\ncontrols\r\nautoplay\r\nplaysinline\r\n(play)=\"onPlayFeedbackVideo()\"></video>\r\n</ion-content>\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_content_example-detail_example-detail_module_ts.js.map