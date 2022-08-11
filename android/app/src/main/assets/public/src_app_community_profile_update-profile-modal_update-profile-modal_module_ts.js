"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_community_profile_update-profile-modal_update-profile-modal_module_ts"],{

/***/ 6142:
/*!***********************************************************************************************!*\
  !*** ./src/app/community/profile/update-profile-modal/update-profile-modal-routing.module.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateProfileModalPageRoutingModule": () => (/* binding */ UpdateProfileModalPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _update_profile_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./update-profile-modal.page */ 5612);




const routes = [
    {
        path: '',
        component: _update_profile_modal_page__WEBPACK_IMPORTED_MODULE_0__.UpdateProfileModalPage
    }
];
let UpdateProfileModalPageRoutingModule = class UpdateProfileModalPageRoutingModule {
};
UpdateProfileModalPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], UpdateProfileModalPageRoutingModule);



/***/ }),

/***/ 6079:
/*!***************************************************************************************!*\
  !*** ./src/app/community/profile/update-profile-modal/update-profile-modal.module.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateProfileModalPageModule": () => (/* binding */ UpdateProfileModalPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _update_profile_modal_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./update-profile-modal-routing.module */ 6142);
/* harmony import */ var _update_profile_modal_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./update-profile-modal.page */ 5612);







let UpdateProfileModalPageModule = class UpdateProfileModalPageModule {
};
UpdateProfileModalPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _update_profile_modal_routing_module__WEBPACK_IMPORTED_MODULE_0__.UpdateProfileModalPageRoutingModule
        ],
        declarations: [_update_profile_modal_page__WEBPACK_IMPORTED_MODULE_1__.UpdateProfileModalPage]
    })
], UpdateProfileModalPageModule);



/***/ })

}]);
//# sourceMappingURL=src_app_community_profile_update-profile-modal_update-profile-modal_module_ts.js.map