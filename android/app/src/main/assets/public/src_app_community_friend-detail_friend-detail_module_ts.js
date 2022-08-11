"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_community_friend-detail_friend-detail_module_ts"],{

/***/ 9493:
/*!*************************************************************************!*\
  !*** ./src/app/community/friend-detail/friend-detail-routing.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FriendDetailPageRoutingModule": () => (/* binding */ FriendDetailPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _friend_detail_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./friend-detail.page */ 4684);




const routes = [
    {
        path: '',
        component: _friend_detail_page__WEBPACK_IMPORTED_MODULE_0__.FriendDetailPage
    }
];
let FriendDetailPageRoutingModule = class FriendDetailPageRoutingModule {
};
FriendDetailPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], FriendDetailPageRoutingModule);



/***/ }),

/***/ 6671:
/*!*****************************************************************!*\
  !*** ./src/app/community/friend-detail/friend-detail.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FriendDetailPageModule": () => (/* binding */ FriendDetailPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _friend_detail_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./friend-detail-routing.module */ 9493);
/* harmony import */ var _friend_detail_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./friend-detail.page */ 4684);







let FriendDetailPageModule = class FriendDetailPageModule {
};
FriendDetailPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _friend_detail_routing_module__WEBPACK_IMPORTED_MODULE_0__.FriendDetailPageRoutingModule
        ],
        declarations: [_friend_detail_page__WEBPACK_IMPORTED_MODULE_1__.FriendDetailPage]
    })
], FriendDetailPageModule);



/***/ }),

/***/ 4684:
/*!***************************************************************!*\
  !*** ./src/app/community/friend-detail/friend-detail.page.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FriendDetailPage": () => (/* binding */ FriendDetailPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _friend_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./friend-detail.page.html?ngResource */ 8285);
/* harmony import */ var _friend_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./friend-detail.page.scss?ngResource */ 3440);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/user.service */ 3071);







let FriendDetailPage = class FriendDetailPage {
    constructor(alertCtrl, activatedRoute, userService) {
        this.alertCtrl = alertCtrl;
        this.activatedRoute = activatedRoute;
        this.userService = userService;
        this.friendProfileImage = '';
        this.friendName = '';
        this.friendAboutMe = '';
        this.friendCountry = '';
        this.friendLanguages = '';
        this.friendSubjects = '';
    }
    ngOnInit() {
        this.getFriend();
        this.getConnectionId();
    }
    getFriend() {
        const id = this.activatedRoute.snapshot.params['friendId'];
        console.log('ActivatedRoute got: ', id);
        this.userService.getUserById(id)
            .subscribe(res => {
            this.friendId = id;
            this.friendEmail = res.email;
            if (res.profileImage != undefined) {
                this.friendProfileImage = res.profileImage;
            }
            if (res.name != undefined) {
                this.friendName = res.name;
            }
            if (res.aboutMe != undefined) {
                this.friendAboutMe = res.aboutMe;
            }
            if (res.country != undefined) {
                this.friendCountry = res.country;
            }
            if (res.languages != undefined) {
                this.friendLanguages = res.languages.join(", ");
            }
            if (res.subjects != undefined) {
                this.friendSubjects = res.subjects.join(", ");
                console.log('res.Subjects[ ] - ', res.subjects);
            }
        });
    }
    removeFriend() {
    }
    getConnectionId() {
        //const currentUserId = this.authService.getCurrentUserId();
        this.userService.getCurrentUserConnections().subscribe(res => {
            const test = res.forEach(value => {
                if (value.groupName == '') { //filtert alle groups weg, friendships bleiben übrig
                    const users = value.users; //holt sich die user ids als Array
                    users.forEach(id => {
                        if (id == this.friendId) {
                            console.log(value);
                            this.connectionId = value.id;
                        }
                    });
                }
            });
        });
    }
    presentAlert() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const alert = yield this.alertCtrl.create({
                header: 'Remove friend, are you sure?',
                subHeader: 'Feature "removing friends" is in progress.',
                message: 'Includes removing connection and updating lessons.',
                buttons: ['OK']
            });
            yield alert.present();
            const { role } = yield alert.onDidDismiss();
            console.log('onDidDismiss resolved with role', role);
        });
    }
};
FriendDetailPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.AlertController },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute },
    { type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__.UserService }
];
FriendDetailPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-friend-detail',
        template: _friend_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_friend_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], FriendDetailPage);



/***/ }),

/***/ 3440:
/*!****************************************************************************!*\
  !*** ./src/app/community/friend-detail/friend-detail.page.scss?ngResource ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmcmllbmQtZGV0YWlsLnBhZ2Uuc2NzcyJ9 */";

/***/ }),

/***/ 8285:
/*!****************************************************************************!*\
  !*** ./src/app/community/friend-detail/friend-detail.page.html?ngResource ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"home/community\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title *ngIf=\"!friendName == ''\">{{ friendName }}</ion-title>\r\n    <ion-title *ngIf=\"friendName == ''\">{{ friendEmail }}</ion-title>\r\n      <ion-button \r\n        slot=\"end\"\r\n        color=\"light\"\r\n        (click)=\"presentAlert()\">Remove\r\n      </ion-button>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n \r\n  <ion-row>\r\n    <ion-col size=\"7\">\r\n      <ion-button color=\"secondary\" expand=\"block\" routerLink=\"/home/community/chat/{{connectionId}}\">\r\n        Chat zone\r\n        <ion-icon slot=\"end\" name=\"cafe\"></ion-icon>\r\n      </ion-button>\r\n    </ion-col>\r\n    <ion-col size=\"5\">\r\n      <ion-item>\r\n        <img \r\n          src=\"{{ friendProfileImage }}\" \r\n          *ngIf=\"(friendProfileImage !== '')\"\r\n          width=\"50px\"\r\n          slot=\"end\"/>\r\n          <img \r\n          src=\"../../assets/happy.png\" \r\n          *ngIf=\"(friendProfileImage == '')\"\r\n          width=\"50px\"\r\n          slot=\"end\"/>\r\n      </ion-item>\r\n    </ion-col>\r\n  </ion-row>\r\n    <ion-card *ngIf=\"!friendAboutMe == ''\">\r\n      <ion-card-header>\r\n        <ion-card-subtitle>About Me</ion-card-subtitle>\r\n      </ion-card-header>  \r\n      <ion-card-content>{{ friendAboutMe }}</ion-card-content>\r\n    </ion-card>\r\n    <ion-item *ngIf=\"!friendCountry == ''\">\r\n      <ion-icon slot=\"start\" name=\"earth-outline\"></ion-icon>\r\n      <ion-label>{{ friendCountry }}</ion-label>\r\n    </ion-item>\r\n    <ion-item  *ngIf=\"!friendSubjects == ''\">\r\n      <ion-icon slot=\"start\" name=\"school-outline\"></ion-icon>\r\n      <ion-label>{{ friendSubjects }}</ion-label>\r\n    </ion-item>\r\n    <ion-item *ngIf=\"!friendLanguages == ''\">\r\n      <ion-icon slot=\"start\" name=\"language-outline\"></ion-icon>\r\n      <ion-label>{{ friendLanguages }}</ion-label>\r\n    </ion-item>\r\n    <ion-text color=\"success\">hier ein accordeon mit den common videos? oder nur in groups?</ion-text>\r\n\r\n</ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_community_friend-detail_friend-detail_module_ts.js.map