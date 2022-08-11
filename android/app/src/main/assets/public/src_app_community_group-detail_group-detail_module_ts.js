"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_community_group-detail_group-detail_module_ts"],{

/***/ 6809:
/*!***********************************************************************!*\
  !*** ./src/app/community/group-detail/group-detail-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupDetailPageRoutingModule": () => (/* binding */ GroupDetailPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _group_detail_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./group-detail.page */ 6951);




const routes = [
    {
        path: '',
        component: _group_detail_page__WEBPACK_IMPORTED_MODULE_0__.GroupDetailPage
    }
];
let GroupDetailPageRoutingModule = class GroupDetailPageRoutingModule {
};
GroupDetailPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], GroupDetailPageRoutingModule);



/***/ }),

/***/ 2997:
/*!***************************************************************!*\
  !*** ./src/app/community/group-detail/group-detail.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupDetailPageModule": () => (/* binding */ GroupDetailPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _group_detail_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./group-detail-routing.module */ 6809);
/* harmony import */ var _group_detail_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./group-detail.page */ 6951);







let GroupDetailPageModule = class GroupDetailPageModule {
};
GroupDetailPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _group_detail_routing_module__WEBPACK_IMPORTED_MODULE_0__.GroupDetailPageRoutingModule
        ],
        declarations: [_group_detail_page__WEBPACK_IMPORTED_MODULE_1__.GroupDetailPage]
    })
], GroupDetailPageModule);



/***/ }),

/***/ 6951:
/*!*************************************************************!*\
  !*** ./src/app/community/group-detail/group-detail.page.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupDetailPage": () => (/* binding */ GroupDetailPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _group_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./group-detail.page.html?ngResource */ 5808);
/* harmony import */ var _group_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./group-detail.page.scss?ngResource */ 6512);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);




let GroupDetailPage = class GroupDetailPage {
    constructor() { }
    ngOnInit() {
    }
};
GroupDetailPage.ctorParameters = () => [];
GroupDetailPage = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-group-detail',
        template: _group_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_group_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], GroupDetailPage);



/***/ }),

/***/ 6512:
/*!**************************************************************************!*\
  !*** ./src/app/community/group-detail/group-detail.page.scss?ngResource ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJncm91cC1kZXRhaWwucGFnZS5zY3NzIn0= */";

/***/ }),

/***/ 5808:
/*!**************************************************************************!*\
  !*** ./src/app/community/group-detail/group-detail.page.html?ngResource ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>group-detail</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n\r\n</ion-content>\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_community_group-detail_group-detail_module_ts.js.map