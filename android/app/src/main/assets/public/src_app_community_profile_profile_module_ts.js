"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_community_profile_profile_module_ts"],{

/***/ 8621:
/*!*************************************************************!*\
  !*** ./src/app/community/profile/profile-routing.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfilePageRoutingModule": () => (/* binding */ ProfilePageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile.page */ 1702);




const routes = [
    {
        path: '',
        component: _profile_page__WEBPACK_IMPORTED_MODULE_0__.ProfilePage
    },
    {
        path: 'update-profile-modal',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_community_profile_update-profile-modal_update-profile-modal_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./update-profile-modal/update-profile-modal.module */ 6079)).then(m => m.UpdateProfileModalPageModule)
    }
];
let ProfilePageRoutingModule = class ProfilePageRoutingModule {
};
ProfilePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ProfilePageRoutingModule);



/***/ }),

/***/ 9176:
/*!*****************************************************!*\
  !*** ./src/app/community/profile/profile.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfilePageModule": () => (/* binding */ ProfilePageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _profile_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile-routing.module */ 8621);
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile.page */ 1702);







let ProfilePageModule = class ProfilePageModule {
};
ProfilePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _profile_routing_module__WEBPACK_IMPORTED_MODULE_0__.ProfilePageRoutingModule
        ],
        declarations: [_profile_page__WEBPACK_IMPORTED_MODULE_1__.ProfilePage]
    })
], ProfilePageModule);



/***/ }),

/***/ 1702:
/*!***************************************************!*\
  !*** ./src/app/community/profile/profile.page.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfilePage": () => (/* binding */ ProfilePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _profile_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile.page.html?ngResource */ 6724);
/* harmony import */ var _profile_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile.page.scss?ngResource */ 4935);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _update_profile_modal_update_profile_modal_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./update-profile-modal/update-profile-modal.page */ 5612);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/auth.service */ 7556);







let ProfilePage = class ProfilePage {
    constructor(authService, modalCtrl, alertCtrl) {
        this.authService = authService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.currentUserName = '';
        this.currentUserAboutMe = '';
        this.currentUserCountry = '';
        this.currentUserSubjects = '';
        this.currentUserLanguages = '';
    }
    ngOnInit() {
        this.authService.getCurrentUser().subscribe(res => {
            this.currentUserEmail = res.email;
            if (res.profileImage != undefined) {
                this.currentUserProfileImage = res.profileImage;
            }
            if (res.name != undefined) {
                this.currentUserName = res.name;
            }
            if (res.aboutMe != undefined) {
                this.currentUserAboutMe = res.aboutMe;
            }
            if (res.country != undefined) {
                this.currentUserCountry = res.country;
            }
            if (res.languages != undefined) {
                this.currentUserLanguages = res.languages.join(", ");
            }
            if (res.subjects != undefined) {
                this.currentUserSubjects = res.subjects.join(", ");
                console.log('res.Subjects[ ] - ', res.subjects);
            }
        });
    }
    openUpdateModal() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const id = this.authService.getCurrentUserId();
            const modal = yield this.modalCtrl.create({
                component: _update_profile_modal_update_profile_modal_page__WEBPACK_IMPORTED_MODULE_2__.UpdateProfileModalPage,
                componentProps: { id: id },
                initialBreakpoint: 0.8
            });
            yield modal.present();
        });
    }
    infoAlert() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const alert = yield this.alertCtrl.create({
                header: 'subjects - languages',
                subHeader: 'Features "Adding&Updating subjects and languages" are in progress.',
                message: 'Implementation of language and subject pickers possibly necessary. Same to country, actually.',
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
};
ProfilePage.ctorParameters = () => [
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.AlertController }
];
ProfilePage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-profile',
        template: _profile_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_profile_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ProfilePage);



/***/ }),

/***/ 5612:
/*!*************************************************************************************!*\
  !*** ./src/app/community/profile/update-profile-modal/update-profile-modal.page.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateProfileModalPage": () => (/* binding */ UpdateProfileModalPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _update_profile_modal_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./update-profile-modal.page.html?ngResource */ 5279);
/* harmony import */ var _update_profile_modal_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./update-profile-modal.page.scss?ngResource */ 2676);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/user.service */ 3071);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 3819);






let UpdateProfileModalPage = class UpdateProfileModalPage {
    constructor(userService, modalCtrl) {
        this.userService = userService;
        this.modalCtrl = modalCtrl;
        this.userName = '';
        this.userAboutMe = '';
        this.userCountry = '';
    }
    ngOnInit() {
        this.userService.getUserById(this.id).subscribe(res => {
            this.userName = res.name;
            console.log('update profile modal userName in ngOnInit: ', this.userName);
            this.userAboutMe = res.aboutMe;
            this.userCountry = res.country;
        });
    }
    updateUser() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            this.userService.updateUser(this.id, this.userName, this.userAboutMe, this.userCountry);
            this.modalCtrl.dismiss();
        });
    }
    cancel() {
        this.modalCtrl.dismiss();
    }
};
UpdateProfileModalPage.ctorParameters = () => [
    { type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__.UserService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController }
];
UpdateProfileModalPage.propDecorators = {
    id: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }]
};
UpdateProfileModalPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-update-profile-modal',
        template: _update_profile_modal_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_update_profile_modal_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], UpdateProfileModalPage);



/***/ }),

/***/ 4935:
/*!****************************************************************!*\
  !*** ./src/app/community/profile/profile.page.scss?ngResource ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9maWxlLnBhZ2Uuc2NzcyJ9 */";

/***/ }),

/***/ 2676:
/*!**************************************************************************************************!*\
  !*** ./src/app/community/profile/update-profile-modal/update-profile-modal.page.scss?ngResource ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1cGRhdGUtcHJvZmlsZS1tb2RhbC5wYWdlLnNjc3MifQ== */";

/***/ }),

/***/ 6724:
/*!****************************************************************!*\
  !*** ./src/app/community/profile/profile.page.html?ngResource ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"home/content\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title>My profile</ion-title>\r\n    <ion-buttons slot=\"end\">\r\n      <ion-button \r\n        size=\"small\" color=\"primary\" \r\n        *ngIf=\"currentUserProfileImage == '' || currentUserProfileImage == null\">\r\n        <ion-icon name=\"happy-outline\"></ion-icon>\r\n      </ion-button>      \r\n      <ion-button \r\n        *ngIf=\"!currentUserProfileImage == '' || !currentUserProfileImage == null\">\r\n        <ion-thumbnail style=\"padding: 0.5rem;\">\r\n          <img src=\"{{ currentUserProfileImage }}\">\r\n        </ion-thumbnail>\r\n      </ion-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <ion-item (click)=\"openUpdateModal()\">\r\n    <ion-label>\r\n      <h2>{{ currentUserName }}</h2>\r\n    </ion-label>\r\n    <ion-button *ngIf=\"currentUserName == ''\">\r\n      Add a name to your profile\r\n    </ion-button>\r\n    <ion-icon *ngIf=\"!currentUserName == ''\" slot=\"end\" name=\"create-outline\"></ion-icon>\r\n  </ion-item>\r\n  <ion-card>\r\n    <ion-card-header>\r\n      <ion-card-subtitle>About Me</ion-card-subtitle>  \r\n    </ion-card-header>  \r\n    <ion-card-content *ngIf=\"currentUserAboutMe == ''\" (click)=\"openUpdateModal()\">\r\n      <ion-button size=\"small\">\r\n        Tell the community something about yourself!\r\n      </ion-button>\r\n    </ion-card-content>\r\n    <ion-card-content *ngIf=\"!currentUserAboutMe == ''\" (click)=\"openUpdateModal()\">\r\n      <ion-icon slot=\"end\" name=\"create-outline\"></ion-icon>\r\n      {{ currentUserAboutMe }}\r\n    </ion-card-content>\r\n  </ion-card>\r\n  <ion-item (click)=\"openUpdateModal()\">\r\n    <ion-icon slot=\"start\" name=\"earth-outline\"></ion-icon>\r\n    <ion-label>{{ currentUserCountry }}</ion-label>\r\n    <ion-button *ngIf=\"currentUserCountry == ''\">\r\n      Add a country to your profile\r\n    </ion-button>\r\n    <ion-icon *ngIf=\"!currentUserCountry == ''\" slot=\"end\" name=\"create-outline\"></ion-icon>\r\n  </ion-item>\r\n  <ion-item (click)=\"infoAlert()\">\r\n    <ion-icon slot=\"start\" name=\"school-outline\"></ion-icon>\r\n    <ion-label>{{ currentUserSubjects }}</ion-label>\r\n    <ion-button *ngIf=\"currentUserSubjects == ''\">\r\n      Add subjects to your profile\r\n    </ion-button>\r\n    <ion-icon *ngIf=\"!currentUserSubjects == ''\" slot=\"end\" name=\"create-outline\"></ion-icon>\r\n  </ion-item>\r\n  <ion-item (click)=\"infoAlert()\">\r\n    <ion-icon slot=\"start\" name=\"language-outline\"></ion-icon>\r\n    <ion-label>{{ currentUserLanguages }}</ion-label>\r\n    <ion-button *ngIf=\"currentUserLanguages == ''\">\r\n      Add languages to your profile\r\n    </ion-button>\r\n    <ion-icon *ngIf=\"!currentUserLanguages == ''\" slot=\"end\" name=\"create-outline\"></ion-icon>\r\n  </ion-item>\r\n</ion-content>\r\n";

/***/ }),

/***/ 5279:
/*!**************************************************************************************************!*\
  !*** ./src/app/community/profile/update-profile-modal/update-profile-modal.page.html?ngResource ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>Update your profile</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div>\r\n    <ion-item>\r\n      <ion-label position=\"stacked\">Name</ion-label>\r\n      <ion-input [(ngModel)]=\"userName\"></ion-input>\r\n    </ion-item> \r\n    <ion-item>\r\n      <ion-label position=\"stacked\">About me</ion-label>\r\n      <ion-textarea [(ngModel)]=\"userAboutMe\" rows=\"8\"></ion-textarea>\r\n    </ion-item>\r\n    <ion-item>\r\n      <ion-label position=\"stacked\">Country</ion-label>\r\n      <ion-input [(ngModel)]=\"userCountry\"></ion-input>\r\n    </ion-item> \r\n  </div>\r\n  <ion-row>\r\n    <ion-col size=\"6\">\r\n      <ion-button expand=\"block\" (click)=\"cancel()\">\r\n        Cancel\r\n      </ion-button>\r\n    </ion-col>\r\n    <ion-col size=\"6\">\r\n      <ion-button expand=\"block\" color=\"success\" (click)=\"updateUser()\">        \r\n        Ok\r\n        <ion-icon name=\"happy-outline\" slot=\"end\"></ion-icon>\r\n      </ion-button>\r\n    </ion-col>\r\n  </ion-row>\r\n  \r\n  \r\n</ion-content>\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_community_profile_profile_module_ts.js.map