"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_content_choose-teacher-modal_choose-teacher-modal_page_ts"],{

/***/ 1967:
/*!***************************************************************************!*\
  !*** ./src/app/content/choose-teacher-modal/choose-teacher-modal.page.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChooseTeacherModalPage": () => (/* binding */ ChooseTeacherModalPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _choose_teacher_modal_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./choose-teacher-modal.page.html?ngResource */ 2428);
/* harmony import */ var _choose_teacher_modal_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./choose-teacher-modal.page.scss?ngResource */ 1249);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/auth.service */ 7556);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/user.service */ 3071);
/* harmony import */ var src_app_services_lesson_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/lesson.service */ 468);








let ChooseTeacherModalPage = class ChooseTeacherModalPage {
    constructor(authService, userService, lessonService, modalCtrl) {
        this.authService = authService;
        this.userService = userService;
        this.lessonService = lessonService;
        this.modalCtrl = modalCtrl;
        this.friendIds = [];
        this.friends = [];
        this.groups = [];
        this.publicTeachers = [];
        this.selectedFriendId = '';
        this.selectedFriendDisplayedString = '';
        this.selectedFriendConnectionId = '';
        this.selectedGroupId = ''; //TO DO  
    }
    ngOnInit() {
        ////getting friends via conections
        this.getFriends(); //FÜHRT DIE FUNKTION AUS IRGENDEINEM GRUND ZWEI MAL AUS
        /////                 SIEHE KONSOLE
    }
    getFriends() {
        const currentUserId = this.authService.getCurrentUserId();
        this.userService.getCurrentUserConnections().subscribe(res => {
            res.forEach(value => {
                if (value.groupName == '') { //filtert alle groups weg, friendships bleiben übrig
                    const users = value.users;
                    console.log('INSIDE getFriends(): connection id', value.id, 'connection users: ', value.users);
                    //holt sich die friend ids als Array:
                    users.forEach(id => {
                        this.friendIds.push(id);
                    });
                }
            });
            this.userService.getUsersByUserIds(this.friendIds).subscribe(res => {
                this.friends = res;
                console.log('friends INSIDE getUsersByUserIds(this.friendIds): ', res); //CHECKEN WIE MAN DAS ASYNCHRON HINKRIEGT
            });
        });
    }
    //MODAL SECTION:
    close() {
        this.modalCtrl.dismiss();
    }
    selectFriend() {
        this.userService.getConnectionByFriendId(this.selectedFriendId).subscribe(res => {
            console.log('Current info inside choose-teacher-modal', res);
            res.forEach(value => this.selectedFriendConnectionId = value.id);
            console.log('dummy addLesson with connectionId inside subscribe', this.selectedFriendConnectionId);
        });
        /* this.modalCtrl.dismiss({
           user: { id: this.selectedUserId }
         }); */
    }
    selectFriendName(friendName, friendEmail) {
        console.log('friend name : ', friendName, 'friend email: ', friendEmail);
        this.selectedFriendDisplayedString = friendName;
        if (this.selectedFriendDisplayedString == '') {
            this.selectedFriendDisplayedString = friendEmail;
        }
    }
    friendChange(event) {
        console.log("friendChange test", event.detail.value);
        this.selectedFriendId = event.detail.value;
    }
};
ChooseTeacherModalPage.ctorParameters = () => [
    { type: src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService },
    { type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_3__.UserService },
    { type: src_app_services_lesson_service__WEBPACK_IMPORTED_MODULE_4__.LessonService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController }
];
ChooseTeacherModalPage.propDecorators = {
    title: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input }],
    notes: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input }],
    length: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input }],
    videoLocalUrl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input }]
};
ChooseTeacherModalPage = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-choose-teacher-modal',
        template: _choose_teacher_modal_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_choose_teacher_modal_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ChooseTeacherModalPage);



/***/ }),

/***/ 468:
/*!********************************************!*\
  !*** ./src/app/services/lesson.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LessonService": () => (/* binding */ LessonService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/fire/firestore */ 6466);



let LessonService = class LessonService {
    constructor(firestore) {
        this.firestore = firestore;
    }
    addLesson(videoId, connectionId) {
        const lessonsRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(this.firestore, 'lessons');
        return (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__.addDoc)(lessonsRef, {
            createdAt: (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)(),
            connectionId: connectionId,
            status: 'requested',
            videoId: videoId,
            numberOfFeedbacks: 0
        });
    }
};
LessonService.ctorParameters = () => [
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__.Firestore }
];
LessonService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({
        providedIn: 'root'
    })
], LessonService);



/***/ }),

/***/ 3071:
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserService": () => (/* binding */ UserService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/auth */ 1577);
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/firestore */ 6466);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 2218);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 5921);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 6942);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.service */ 7556);







let UserService = class UserService {
    constructor(firestore, firebaseAuth, authService) {
        this.firestore = firestore;
        this.firebaseAuth = firebaseAuth;
        this.authService = authService;
        this.logout$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
        (0,_angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__.onAuthStateChanged)(this.firebaseAuth, user => {
            if (!user) {
                this.logout$.next(true);
            }
        });
    }
    ////// USER SECTION ///////////
    getAllUsers() {
        const currentUserId = this.authService.getCurrentUserId();
        const usersRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(this.firestore, 'users');
        return (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.collectionData)(usersRef, { idField: 'id' })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.takeUntil)(this.logout$), //returns Data until logout: Subject logout$ emits value
        (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(users => {
            return users.filter(user => user.id != currentUserId);
        }));
    }
    getUserById(id) {
        const userRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(this.firestore, `users/${id}`);
        return (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.docData)(userRef);
    }
    getUsersByUserIds(ids) {
        const currentUserId = this.authService.getCurrentUserId();
        const usersRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(this.firestore, 'users');
        console.log('FRIENDS IDS?', ids);
        return (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.collectionData)(usersRef, { idField: 'id' }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(users => {
            //filtert die user aller connections des current users heraus zieht den current user davon ab:
            return users.filter(user => ids.includes(user.id) && user.id != currentUserId);
        }));
    }
    getUsersExcludedByUserIds(ids) {
        const currentUserId = this.authService.getCurrentUserId();
        const usersRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(this.firestore, 'users');
        return (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.collectionData)(usersRef, { idField: 'id' }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(users => {
            //filtert die user aller connections des current users heraus zieht den current user davon ab:
            return users.filter(user => !ids.includes(user.id) && user.id != currentUserId);
        }));
    }
    getPublicTeachers() {
        const usersRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(this.firestore, 'users');
        console.log('logout$: ', this.logout$);
        return (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.collectionData)(usersRef, { idField: 'id' })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.takeUntil)(this.logout$), //returns Data until logout: Subject logout$ emits value
        (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(users => {
            return users.filter(user => user.publicTeacher == true);
        }));
    }
    //////// EDIT USER SECTION ////////////////
    updateUser(id, name, aboutMe, country) {
        const userRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(this.firestore, `users/${id}`);
        (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.updateDoc)(userRef, { name: name, aboutMe: aboutMe, country: country });
    }
    /////////CONNECTION SECTION//////////////
    //Senden einer Freundschaftsanfrage:
    getCurrentUserConnections() {
        const currentUserId = this.authService.getCurrentUserId();
        const connectionsRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(this.firestore, 'connections');
        const q = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.query)(connectionsRef, (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.where)('users', 'array-contains', currentUserId));
        return (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.collectionData)(q, { idField: 'id' });
    }
    getConnectionByFriendId(friendId) {
        const currentUserId = this.authService.getCurrentUserId();
        const connectionsRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(this.firestore, 'connections');
        const q = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.query)(connectionsRef, (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.where)('users', 'array-contains', friendId));
        return (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.collectionData)(q, { idField: 'id' }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(connections => {
            //checken, ob groups wirklich ausgefiltert werden:
            return connections.filter(connection => connection.users.includes(friendId) && connection.groupName == '');
        }));
    }
    requestConnection(requestedUserId) {
        const userDocRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(this.firestore, `users/${requestedUserId}`); //Referenz zum document des angefragten Users
        const currentUserId = this.authService.getCurrentUserId(); //id des anfragenden Users (currentUserID)
        const users = [requestedUserId, currentUserId];
        for (let user of users) { //geht durch die User (userIds) im neuen connection-document
            const userRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(this.firestore, `users/${user}`); //referenziert die Collection 'users'
            if (user == currentUserId) { //für den requesting user (currentUser);
                (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.updateDoc)(userRef, {
                    sentConnectionRequests: requestedUserId //muss später als Array behandelt werden: requestingUserId aus dem Array heraus nehmen!!
                });
            }
            else { //für den requested user (currentUser);
                (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.updateDoc)(userRef, {
                    receivedConnectionRequests: currentUserId //muss später als Array behandelt werden: currentUserId aus dem Array heraus nehmen!!
                });
            }
        }
        return (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.updateDoc)(userDocRef, { connectionRequests: currentUserId }); //zu Array.push umwandeln
    }
    //Annehmen einer Freundschaftsanfrage:
    addFriend(requestingUserId) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const currentUserId = this.authService.getCurrentUserId(); //id des requested users (currentUserId)
            const connectionsRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(this.firestore, 'connections'); //Referenz zur Collection 'Connections'
            const users = [requestingUserId, currentUserId]; // Ids der requesting und requested User als Array-Variable 'users'
            const promises = [];
            return (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.addDoc)(connectionsRef, {
                createdAt: (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.serverTimestamp)(),
                groupName: '',
                users
            }).then(res => {
                for (let user of users) { //geht durch die User (userIds) im neuen connection-document
                    console.log('user of users: ', user);
                    const userRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(this.firestore, `users/${user}`); //referenziert die Collection 'users'
                    if (user == currentUserId) { //für den requested user (currentUser);
                        (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.updateDoc)(userRef, {
                            //friends: arrayUnion(requestingUserId), //fügt den requesting user zum Array-Feld 'friends' hinzu
                            receivedConnectionRequests: '' //muss später als Array behandelt werden: requestingUserId aus dem Array heraus nehmen!!
                        });
                    }
                    else { //für den requesting user (currentUser);
                        (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.updateDoc)(userRef, {
                            //friends: arrayUnion(currentUserId), //fügt den requested user zum Array-Feld 'friends' hinzu
                            sentConnectionRequests: '' //muss später als Array behandelt werden: currentUserId aus dem Array heraus nehmen!!
                        });
                    }
                }
                return Promise.all(promises);
            });
        });
    }
    //Ablehnen einer Freundschaftsanfrage:
    cleanConnectionRequests(requestingUserId) {
        const currentUserId = this.authService.getCurrentUserId(); //id des requested users (currentUserId)
        const users = [requestingUserId, currentUserId]; // Ids der requesting und requested User als Array-Variable 'users'
        for (let user of users) { //geht durch die User (userIds) im neuen connection-document
            const userRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(this.firestore, `users/${user}`); //referenziert die Collection 'users'
            if (user == currentUserId) { //für den requested user (currentUser);
                (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.updateDoc)(userRef, {
                    receivedConnectionRequests: '' //muss später als Array behandelt werden: requestingUserId aus dem Array heraus nehmen!!
                });
            }
            else { //für den requesting user (currentUser);
                (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.updateDoc)(userRef, {
                    sentConnectionRequests: '' //muss später als Array behandelt werden: currentUserId aus dem Array heraus nehmen!!
                });
            }
        }
    }
    //////////////// CHAT SECTION //////////////////////
    getConnectionInfo(connectionId) {
        const connectionRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(this.firestore, `connections/${connectionId}`);
        return (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.docData)(connectionRef);
    }
    getChatMessages(connectionId) {
        const messagesRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(this.firestore, `connections/${connectionId}/messages`);
        const q = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.query)(messagesRef, (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.orderBy)('createdAt'));
        return (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.collectionData)(q, { idField: 'id' });
    }
    addMessage(connectionId, msg) {
        const userId = this.authService.getCurrentUserId();
        const messagesRef = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(this.firestore, `connections/${connectionId}/messages`);
        return (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.addDoc)(messagesRef, {
            from: userId,
            msg,
            createdAt: (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.serverTimestamp)()
        });
    }
};
UserService.ctorParameters = () => [
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__.Firestore },
    { type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__.Auth },
    { type: _auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService }
];
UserService = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injectable)({
        providedIn: 'root'
    })
], UserService);



/***/ }),

/***/ 1249:
/*!****************************************************************************************!*\
  !*** ./src/app/content/choose-teacher-modal/choose-teacher-modal.page.scss?ngResource ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = ".friends-card {\n  padding-left: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNob29zZS10ZWFjaGVyLW1vZGFsLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0FBQ0oiLCJmaWxlIjoiY2hvb3NlLXRlYWNoZXItbW9kYWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZyaWVuZHMtY2FyZCB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XHJcbn0iXX0= */";

/***/ }),

/***/ 2428:
/*!****************************************************************************************!*\
  !*** ./src/app/content/choose-teacher-modal/choose-teacher-modal.page.html?ngResource ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>Ask for feedback</ion-title>\r\n    <ion-buttons slot=\"end\">\r\n      <ion-button (click)=\"close()\">Cancel</ion-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n  <ion-toolbar>\r\n    <ion-segment value=\"friends\">\r\n      <ion-segment-button value=\"friends\">\r\n        <ion-label>Friends</ion-label>\r\n      </ion-segment-button>\r\n      <ion-segment-button value=\"groups\">\r\n        <ion-label>Groups</ion-label>\r\n      </ion-segment-button>\r\n      <ion-segment-button value=\"public\">\r\n        <ion-label>Public</ion-label>\r\n      </ion-segment-button>\r\n    </ion-segment>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <ion-list>\r\n    <ion-radio-group (ionChange)=\"friendChange($event)\">\r\n      <ion-item \r\n          *ngFor=\"let friend of friends\" \r\n          (click)=\"selectFriendName(friend.name, friend.email)\">\r\n        <ion-radio slot=\"start\" value=\"{{friend.id}}\"></ion-radio>\r\n        <ion-avatar *ngIf=\"(friend.profileImage == '')\">\r\n          <ion-icon name=\"happy-outline\" size=\"large\"></ion-icon>\r\n        </ion-avatar>        \r\n        <ion-avatar>\r\n          <ion-img [src]=\"friend.profileImage\" *ngIf=\"(friend.profileImage !== '')\"></ion-img>\r\n        </ion-avatar>\r\n        <ion-label class=\"friends-card\"> {{ friend.name == '' ? friend.email : friend.name }}</ion-label>\r\n      </ion-item>\r\n    </ion-radio-group>\r\n  </ion-list>\r\n</ion-content>\r\n<ion-footer>\r\n  <div *ngIf=\"selectedFriendId != ''\">\r\n    <ion-button \r\n      (click)=\"selectFriend()\"\r\n      fill=\"solid\" \r\n      expand=\"block\" \r\n      color=\"secondary\">\r\n      <ion-icon name=\"person\" slot=\"start\"></ion-icon>\r\n      Ask {{ selectedFriendDisplayedString }}<br>for feedback\r\n      <ion-icon name=\"send\" slot=\"end\"></ion-icon>\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>";

/***/ })

}]);
//# sourceMappingURL=default-src_app_content_choose-teacher-modal_choose-teacher-modal_page_ts.js.map