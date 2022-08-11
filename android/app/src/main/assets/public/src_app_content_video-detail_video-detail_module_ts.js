"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_content_video-detail_video-detail_module_ts"],{

/***/ 7848:
/*!*********************************************************************!*\
  !*** ./src/app/content/video-detail/video-detail-routing.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VideoDetailPageRoutingModule": () => (/* binding */ VideoDetailPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _video_detail_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./video-detail.page */ 7350);




const routes = [
    {
        path: '',
        component: _video_detail_page__WEBPACK_IMPORTED_MODULE_0__.VideoDetailPage
    }
];
let VideoDetailPageRoutingModule = class VideoDetailPageRoutingModule {
};
VideoDetailPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], VideoDetailPageRoutingModule);



/***/ }),

/***/ 8672:
/*!*************************************************************!*\
  !*** ./src/app/content/video-detail/video-detail.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VideoDetailPageModule": () => (/* binding */ VideoDetailPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _video_detail_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./video-detail-routing.module */ 7848);
/* harmony import */ var _video_detail_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./video-detail.page */ 7350);







let VideoDetailPageModule = class VideoDetailPageModule {
};
VideoDetailPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _video_detail_routing_module__WEBPACK_IMPORTED_MODULE_0__.VideoDetailPageRoutingModule
        ],
        declarations: [_video_detail_page__WEBPACK_IMPORTED_MODULE_1__.VideoDetailPage]
    })
], VideoDetailPageModule);



/***/ }),

/***/ 7350:
/*!***********************************************************!*\
  !*** ./src/app/content/video-detail/video-detail.page.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VideoDetailPage": () => (/* binding */ VideoDetailPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _video_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./video-detail.page.html?ngResource */ 4879);
/* harmony import */ var _video_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./video-detail.page.scss?ngResource */ 9157);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var src_app_services_video_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/video.service */ 8472);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 6312);







let VideoDetailPage = class VideoDetailPage {
    constructor(activatedRoute, videoService) {
        this.activatedRoute = activatedRoute;
        this.videoService = videoService;
        this.currentTime = 0;
        this.playButtonStatus = true;
    }
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
        (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.fromEvent)(this.studentVideo.nativeElement, 'loadeddata').subscribe(res => {
            this.duration = this.studentVideo.nativeElement.duration;
            console.log('duration: ', this.duration);
            this.paused = this.studentVideo.nativeElement.paused;
            console.log('paused: ', this.paused);
        });
    }
    timeLineProgress() {
        (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.fromEvent)(this.studentVideo.nativeElement, 'timeupdate').subscribe(res => {
            this.currentTime = this.studentVideo.nativeElement.currentTime;
            this.timeLine = this.studentVideo.nativeElement.currentTime / this.duration;
        });
    }
    onPlayStudentVideo() {
        (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.fromEvent)(this.studentVideo.nativeElement, 'play').subscribe(res => {
            this.paused = false;
            console.log('paused: ', this.paused);
        });
    }
    onPauseStudentVideo() {
        (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.fromEvent)(this.studentVideo.nativeElement, 'pause').subscribe(res => {
            this.paused = true;
            console.log('paused: ', this.paused);
        });
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
};
VideoDetailPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute },
    { type: src_app_services_video_service__WEBPACK_IMPORTED_MODULE_2__.VideoService }
];
VideoDetailPage.propDecorators = {
    studentVideo: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewChild, args: ['studentVideo',] }]
};
VideoDetailPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-video-detail',
        template: _video_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_video_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], VideoDetailPage);



/***/ }),

/***/ 9157:
/*!************************************************************************!*\
  !*** ./src/app/content/video-detail/video-detail.page.scss?ngResource ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ2aWRlby1kZXRhaWwucGFnZS5zY3NzIn0= */";

/***/ }),

/***/ 4879:
/*!************************************************************************!*\
  !*** ./src/app/content/video-detail/video-detail.page.html?ngResource ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"home/content\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title>{{ videoTitle }}</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div sticky=\"true\">\r\n    <video\r\n      #studentVideo\r\n      src=\"{{videoUrl}}\"\r\n      width=\"100%\"\r\n      playsinline\r\n      controls\r\n      [(currentTime)]=\"currentTime\"\r\n      class=\"video\">\r\n    </video>\r\n  <!--   <ion-row>\r\n      <ion-col class=\"control-bar\">\r\n        <ion-button \r\n          size=\"small\" \r\n            color=\"dark\" >          \r\n          <ion-icon name=\"play-skip-back-outline\"></ion-icon>\r\n        </ion-button>  \r\n      </ion-col>\r\n      <ion-col class=\"control-bar\">\r\n        <ion-button \r\n            size=\"small\" \r\n            color=\"dark\">          \r\n          <ion-icon name=\"play-back-circle-outline\"></ion-icon>\r\n          -5\r\n        </ion-button>  \r\n      </ion-col>\r\n      <ion-col class=\"ion-text-center control-bar\">\r\n        <ion-button \r\n          size=\"small\" \r\n          color=\"dark\" \r\n          (click)=\"playPauseStudentVideo()\">\r\n          <ion-icon [name]=\"paused ? 'play-outline' : 'pause-outline'\"></ion-icon>\r\n        </ion-button> \r\n      </ion-col>\r\n      <ion-col class=\"ion-text-end control-bar\">\r\n        <ion-button \r\n          size=\"small\" \r\n          color=\"dark\" >\r\n          +5\r\n          <ion-icon name=\"play-forward-circle-outline\"></ion-icon>           \r\n        </ion-button>   \r\n      </ion-col>       \r\n    </ion-row> -->\r\n    <div>    \r\n      \r\n      <ion-progress-bar\r\n        color=\"secondary\" \r\n        [value]=\"timeLine\">\r\n      </ion-progress-bar>\r\n    </div>   \r\n  </div>\r\n  \r\n</ion-content>\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_content_video-detail_video-detail_module_ts.js.map