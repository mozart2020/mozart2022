"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_content_choose-teacher-modal_choose-teacher-modal_module_ts"],{

/***/ 623:
/*!*************************************************************************************!*\
  !*** ./src/app/content/choose-teacher-modal/choose-teacher-modal-routing.module.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChooseTeacherModalPageRoutingModule": () => (/* binding */ ChooseTeacherModalPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _choose_teacher_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./choose-teacher-modal.page */ 1967);




const routes = [
    {
        path: '',
        component: _choose_teacher_modal_page__WEBPACK_IMPORTED_MODULE_0__.ChooseTeacherModalPage
    }
];
let ChooseTeacherModalPageRoutingModule = class ChooseTeacherModalPageRoutingModule {
};
ChooseTeacherModalPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ChooseTeacherModalPageRoutingModule);



/***/ }),

/***/ 8791:
/*!*****************************************************************************!*\
  !*** ./src/app/content/choose-teacher-modal/choose-teacher-modal.module.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChooseTeacherModalPageModule": () => (/* binding */ ChooseTeacherModalPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _choose_teacher_modal_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./choose-teacher-modal-routing.module */ 623);
/* harmony import */ var _choose_teacher_modal_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./choose-teacher-modal.page */ 1967);







let ChooseTeacherModalPageModule = class ChooseTeacherModalPageModule {
};
ChooseTeacherModalPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _choose_teacher_modal_routing_module__WEBPACK_IMPORTED_MODULE_0__.ChooseTeacherModalPageRoutingModule
        ],
        declarations: [_choose_teacher_modal_page__WEBPACK_IMPORTED_MODULE_1__.ChooseTeacherModalPage]
    })
], ChooseTeacherModalPageModule);



/***/ })

}]);
//# sourceMappingURL=src_app_content_choose-teacher-modal_choose-teacher-modal_module_ts.js.map