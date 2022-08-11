"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_community_chat_chat_module_ts"],{

/***/ 9734:
/*!*******************************************************!*\
  !*** ./src/app/community/chat/chat-routing.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChatPageRoutingModule": () => (/* binding */ ChatPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _chat_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat.page */ 6978);




const routes = [
    {
        path: '',
        component: _chat_page__WEBPACK_IMPORTED_MODULE_0__.ChatPage
    }
];
let ChatPageRoutingModule = class ChatPageRoutingModule {
};
ChatPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ChatPageRoutingModule);



/***/ }),

/***/ 8091:
/*!***********************************************!*\
  !*** ./src/app/community/chat/chat.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChatPageModule": () => (/* binding */ ChatPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _chat_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat-routing.module */ 9734);
/* harmony import */ var _chat_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chat.page */ 6978);







let ChatPageModule = class ChatPageModule {
};
ChatPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _chat_routing_module__WEBPACK_IMPORTED_MODULE_0__.ChatPageRoutingModule
        ],
        declarations: [_chat_page__WEBPACK_IMPORTED_MODULE_1__.ChatPage]
    })
], ChatPageModule);



/***/ }),

/***/ 6978:
/*!*********************************************!*\
  !*** ./src/app/community/chat/chat.page.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChatPage": () => (/* binding */ ChatPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _chat_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat.page.html?ngResource */ 6395);
/* harmony import */ var _chat_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chat.page.scss?ngResource */ 9636);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _capacitor_camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/camera */ 4241);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/auth.service */ 7556);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/user.service */ 3071);
/* harmony import */ var src_app_services_video_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/video.service */ 8472);










let ChatPage = class ChatPage {
    constructor(route, authService, userService, videoService) {
        this.route = route;
        this.authService = authService;
        this.userService = userService;
        this.videoService = videoService;
        this.msg = '';
        this.messages = [];
    }
    ngOnInit() {
        this.connectionId = this.route.snapshot.paramMap.get('id');
        this.currentUserId = this.authService.getCurrentUserId();
        this.userService.getChatMessages(this.connectionId).subscribe(res => {
            for (let m of res) {
                if (this.messages.filter(msg => msg.id == m.id).length == 0) {
                    this.messages.push(m);
                }
            }
            console.log('messages: ', this.messages);
            setTimeout(() => {
                this.content.scrollToBottom(400);
            }, 400);
        });
        this.userService.getConnectionInfo(this.connectionId).subscribe(res => {
            console.log('user ids of connection: ', res.users);
            for (let user of res.users) {
                if (user != this.currentUserId) {
                    this.friendId = user;
                }
            }
            this.userService.getUserById(this.friendId).subscribe(res => {
                console.log('friend info: ', res);
                this.friendEmail = res.email;
                this.friendName = res.name;
            });
        });
    }
    sendMsg() {
        this.userService.addMessage(this.connectionId, this.msg).then(_ => {
            this.msg = '';
            this.content.scrollToBottom(300);
        });
    }
    takeImage() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const image = yield _capacitor_camera__WEBPACK_IMPORTED_MODULE_2__.Camera.getPhoto({
                quality: 60,
                allowEditing: false,
                source: _capacitor_camera__WEBPACK_IMPORTED_MODULE_2__.CameraSource.Camera,
                resultType: _capacitor_camera__WEBPACK_IMPORTED_MODULE_2__.CameraResultType.Base64
            });
            if (image) {
                console.log('image: ', image.base64String);
                this.videoService.addImageMsg(image.base64String, this.connectionId);
            }
        });
    }
};
ChatPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.ActivatedRoute },
    { type: src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService },
    { type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__.UserService },
    { type: src_app_services_video_service__WEBPACK_IMPORTED_MODULE_5__.VideoService }
];
ChatPage.propDecorators = {
    content: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild, args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonContent,] }]
};
ChatPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-chat',
        template: _chat_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_chat_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ChatPage);



/***/ }),

/***/ 4830:
/*!****************************************************************!*\
  !*** ./node_modules/@capacitor/camera/dist/esm/definitions.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CameraDirection": () => (/* binding */ CameraDirection),
/* harmony export */   "CameraResultType": () => (/* binding */ CameraResultType),
/* harmony export */   "CameraSource": () => (/* binding */ CameraSource)
/* harmony export */ });
var CameraSource;
(function (CameraSource) {
    /**
     * Prompts the user to select either the photo album or take a photo.
     */
    CameraSource["Prompt"] = "PROMPT";
    /**
     * Take a new photo using the camera.
     */
    CameraSource["Camera"] = "CAMERA";
    /**
     * Pick an existing photo fron the gallery or photo album.
     */
    CameraSource["Photos"] = "PHOTOS";
})(CameraSource || (CameraSource = {}));
var CameraDirection;
(function (CameraDirection) {
    CameraDirection["Rear"] = "REAR";
    CameraDirection["Front"] = "FRONT";
})(CameraDirection || (CameraDirection = {}));
var CameraResultType;
(function (CameraResultType) {
    CameraResultType["Uri"] = "uri";
    CameraResultType["Base64"] = "base64";
    CameraResultType["DataUrl"] = "dataUrl";
})(CameraResultType || (CameraResultType = {}));


/***/ }),

/***/ 4241:
/*!**********************************************************!*\
  !*** ./node_modules/@capacitor/camera/dist/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Camera": () => (/* binding */ Camera),
/* harmony export */   "CameraDirection": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.CameraDirection),
/* harmony export */   "CameraResultType": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.CameraResultType),
/* harmony export */   "CameraSource": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.CameraSource)
/* harmony export */ });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ 5099);
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./definitions */ 4830);

const Camera = (0,_capacitor_core__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('Camera', {
    web: () => __webpack_require__.e(/*! import() */ "node_modules_capacitor_camera_dist_esm_web_js").then(__webpack_require__.bind(__webpack_require__, /*! ./web */ 1327)).then(m => new m.CameraWeb()),
});




/***/ }),

/***/ 9636:
/*!**********************************************************!*\
  !*** ./src/app/community/chat/chat.page.scss?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = "ion-icon {\n  --ionicon-stroke-width: 16px;\n}\n\n.message-input {\n  width: 100%;\n  border: 1px solid var(--ion-color-medium);\n  border-radius: 5px;\n  background: #fcfcff;\n}\n\nion-textarea {\n  --padding-start: 10px;\n}\n\n.message {\n  padding: 10px !important;\n  border-radius: 10px !important;\n  margin-bottom: 4px !important;\n  color: #fff;\n}\n\n.message img {\n  width: 100%;\n}\n\n.my-message {\n  background: var(--ion-color-secondary);\n}\n\n.other-message {\n  background: var(--ion-color-tertiary);\n}\n\n.my-time {\n  color: #dfdfdf;\n  float: right;\n  font-size: small;\n}\n\n.other-time {\n  color: #0b0909;\n  float: right;\n  font-size: small;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksNEJBQUE7QUFDSjs7QUFDRTtFQUNFLFdBQUE7RUFDQSx5Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFFSjs7QUFDRTtFQUNFLHFCQUFBO0FBRUo7O0FBQ0U7RUFDRSx3QkFBQTtFQUNBLDhCQUFBO0VBQ0EsNkJBQUE7RUFDQSxXQUFBO0FBRUo7O0FBQUk7RUFDRSxXQUFBO0FBRU47O0FBRUU7RUFDRSxzQ0FBQTtBQUNKOztBQUVFO0VBQ0UscUNBQUE7QUFDSjs7QUFFRTtFQUNFLGNBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFDRTtFQUNFLGNBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUFFSiIsImZpbGUiOiJjaGF0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1pY29uIHtcclxuICAgIC0taW9uaWNvbi1zdHJva2Utd2lkdGg6IDE2cHg7XHJcbiAgfVxyXG4gIC5tZXNzYWdlLWlucHV0IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMjUyLCAyNTIsIDI1NSk7XHJcbiAgfVxyXG4gIFxyXG4gIGlvbi10ZXh0YXJlYSB7XHJcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDEwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5tZXNzYWdlIHtcclxuICAgIHBhZGRpbmc6IDEwcHggIWltcG9ydGFudDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHggIWltcG9ydGFudDtcclxuICAgIG1hcmdpbi1ib3R0b206IDRweCAhaW1wb3J0YW50O1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgXHJcbiAgICBpbWcge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLm15LW1lc3NhZ2Uge1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XHJcbiAgfVxyXG4gIFxyXG4gIC5vdGhlci1tZXNzYWdlIHtcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeSk7XHJcbiAgfVxyXG4gIFxyXG4gIC5teS10aW1lIHtcclxuICAgIGNvbG9yOiAjZGZkZmRmO1xyXG4gICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgZm9udC1zaXplOiBzbWFsbDtcclxuICB9XHJcbiAgLm90aGVyLXRpbWUge1xyXG4gICAgY29sb3I6ICMwYjA5MDk7XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICBmb250LXNpemU6IHNtYWxsO1xyXG4gIH1cclxuICBcclxuICAiXX0= */";

/***/ }),

/***/ 6395:
/*!**********************************************************!*\
  !*** ./src/app/community/chat/chat.page.html?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"home/community\"></ion-back-button>\r\n    </ion-buttons>\r\n   <ion-title>{{ friendName }}</ion-title>\r\n   <ion-title *ngIf=\"friendName == ''\">{{ friendEmail }}</ion-title>\r\n   <ion-icon slot=\"end\" name=\"camera-outline\" size=\"large\" (click)=\"takeImage()\"></ion-icon>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding\">\r\n  <ion-row *ngFor=\"let message of messages\">\r\n\r\n    <ion-col size=\"9\" size-md=\"6\" *ngIf=\"message.from !== currentUserId\" class=\"message other-message\">\r\n      <span style=\"color: black;\">{{ message.msg }}\r\n        <img [src]=\"message.file\" *ngIf=\"message.file\">\r\n      </span>\r\n      <div class=\"other-time ion-text-right\"><br>{{ message.createdAt?.toMillis() | date:'short' }}</div>\r\n    </ion-col>\r\n\r\n    <ion-col offset=\"3\" offset-md=\"6\" size=\"9\" size-md=\"6\" *ngIf=\"message.from === currentUserId\" class=\"message my-message\">\r\n      <span>{{ message.msg }}\r\n        <img [src]=\"message.file\" *ngIf=\"message.file\">\r\n      </span>\r\n      <div class=\"my-time ion-text-right\"><br>{{ message.createdAt?.toMillis() | date:'short' }}</div>\r\n    </ion-col>\r\n\r\n  </ion-row>\r\n</ion-content>\r\n<ion-footer>\r\n  <ion-toolbar>\r\n    <ion-row class=\"ion-align-items-end\">\r\n      <ion-col size=\"10\">\r\n        <ion-textarea class=\"message-input\" autoGrow=\"true\" rows=\"1\" [(ngModel)]=\"msg\"></ion-textarea>\r\n      </ion-col>\r\n      <ion-col size=\"1\" (click)=\"sendMsg()\">\r\n        <ion-icon name=\"send-outline\" size=\"large\"></ion-icon>  \r\n      </ion-col>          \r\n    </ion-row>\r\n  </ion-toolbar>\r\n</ion-footer>\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_community_chat_chat_module_ts.js.map