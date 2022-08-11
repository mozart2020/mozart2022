"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_community_community_module_ts"],{

/***/ 238:
/*!*****************************************************************************!*\
  !*** ./src/app/community/add-connection-modal/add-connection-modal.page.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddConnectionModalPage": () => (/* binding */ AddConnectionModalPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _add_connection_modal_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-connection-modal.page.html?ngResource */ 2695);
/* harmony import */ var _add_connection_modal_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add-connection-modal.page.scss?ngResource */ 4471);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/user.service */ 3071);






let AddConnectionModalPage = class AddConnectionModalPage {
    constructor(userService, modalCtrl) {
        this.userService = userService;
        this.modalCtrl = modalCtrl;
        this.notConnectedUsers = [];
        this.selectedUserId = '';
        this.selectedUserDisplayedString = '';
    }
    ngOnInit() {
        //all users - friends excluded
        this.userService.getUsersExcludedByUserIds(this.friendIds).subscribe(res => {
            this.notConnectedUsers = res;
        });
    }
    close() {
        this.modalCtrl.dismiss();
    }
    selectUser() {
        this.modalCtrl.dismiss({
            user: { id: this.selectedUserId }
        });
    }
    selectUserName(userName, userEmail) {
        console.log('user name : ', userName, 'user email: ', userEmail);
        this.selectedUserDisplayedString = userName;
        if (this.selectedUserDisplayedString == '') {
            this.selectedUserDisplayedString = userEmail;
        }
    }
    userChange(event) {
        console.log("userChange test", event.detail.value);
        this.selectedUserId = event.detail.value;
    }
};
AddConnectionModalPage.ctorParameters = () => [
    { type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__.UserService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.ModalController }
];
AddConnectionModalPage.propDecorators = {
    friendIds: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input }]
};
AddConnectionModalPage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-add-connection-modal',
        template: _add_connection_modal_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_add_connection_modal_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], AddConnectionModalPage);



/***/ }),

/***/ 7273:
/*!*******************************************************!*\
  !*** ./src/app/community/community-routing.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommunityPageRoutingModule": () => (/* binding */ CommunityPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _community_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./community.page */ 7197);




const routes = [
    {
        path: '',
        component: _community_page__WEBPACK_IMPORTED_MODULE_0__.CommunityPage
    },
    {
        path: 'profile',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_community_profile_profile_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./profile/profile.module */ 9176)).then(m => m.ProfilePageModule)
    },
    {
        path: 'add-connection-modal',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_community_add-connection-modal_add-connection-modal_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./add-connection-modal/add-connection-modal.module */ 9776)).then(m => m.AddConnectionModalPageModule)
    },
    {
        path: 'friend-detail/:friendId',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_community_friend-detail_friend-detail_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./friend-detail/friend-detail.module */ 6671)).then(m => m.FriendDetailPageModule)
    },
    {
        path: 'group-detail/:groupId',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_community_group-detail_group-detail_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./group-detail/group-detail.module */ 2997)).then(m => m.GroupDetailPageModule)
    },
    {
        path: 'chat/:id',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_services_video_service_ts"), __webpack_require__.e("src_app_community_chat_chat_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./chat/chat.module */ 8091)).then(m => m.ChatPageModule)
    }
];
let CommunityPageRoutingModule = class CommunityPageRoutingModule {
};
CommunityPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], CommunityPageRoutingModule);



/***/ }),

/***/ 4518:
/*!***********************************************!*\
  !*** ./src/app/community/community.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommunityPageModule": () => (/* binding */ CommunityPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _community_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./community-routing.module */ 7273);
/* harmony import */ var _community_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./community.page */ 7197);







let CommunityPageModule = class CommunityPageModule {
};
CommunityPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _community_routing_module__WEBPACK_IMPORTED_MODULE_0__.CommunityPageRoutingModule
        ],
        declarations: [_community_page__WEBPACK_IMPORTED_MODULE_1__.CommunityPage]
    })
], CommunityPageModule);



/***/ }),

/***/ 7197:
/*!*********************************************!*\
  !*** ./src/app/community/community.page.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommunityPage": () => (/* binding */ CommunityPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _community_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./community.page.html?ngResource */ 8322);
/* harmony import */ var _community_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./community.page.scss?ngResource */ 9816);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 2425);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 2218);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _add_connection_modal_add_connection_modal_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-connection-modal/add-connection-modal.page */ 238);
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/user.service */ 3071);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/auth.service */ 7556);
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/fire/auth */ 1577);









//import { NotificationsService } from '../services/notifications.service';

let CommunityPage = class CommunityPage {
    constructor(modalCtrl, routerOutlet, userService, authService, 
    //private notifications: NotificationsService,
    firebaseAuth) {
        this.modalCtrl = modalCtrl;
        this.routerOutlet = routerOutlet;
        this.userService = userService;
        this.authService = authService;
        this.firebaseAuth = firebaseAuth;
        this.friendIds = [];
        this.friends = [];
        this.groups = [];
        this.allSelected = true;
        this.friendsSelected = false;
        this.groupsSelected = false;
        this.receivedRequestId = '';
        this.receivedRequestImage = '';
        this.receivedRequestEmail = '';
        this.sentRequestId = '';
        this.sentRequestEmail = '';
        this.sentRequestImage = '';
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subscription();
        this.logout$ = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
        (0,_angular_fire_auth__WEBPACK_IMPORTED_MODULE_7__.onAuthStateChanged)(this.firebaseAuth, user => {
            if (!user) {
                this.logout$.next(true);
            }
        });
    }
    ngOnInit() {
        this.authService.getCurrentUser().subscribe(res => {
            this.currentUserImage = res.profileImage;
            this.currentUserEmail = res.email;
            if (res.receivedConnectionRequests !== undefined) {
                this.receivedRequestId = res.receivedConnectionRequests;
            }
            if (res.sentConnectionRequests !== undefined) {
                this.sentRequestId = res.sentConnectionRequests;
            }
            //checkt, ob Freundschaftsanfragen vorliegen:
            if (this.receivedRequestId !== '') { //wenn ja, werden die Daten geholt:
                this.userService.getUserById(this.receivedRequestId).subscribe(res => {
                    this.receivedRequestImage = res.profileImage;
                    this.receivedRequestEmail = res.email;
                });
            }
            if (this.sentRequestId !== '') {
                this.userService.getUserById(this.sentRequestId).subscribe(res => {
                    this.sentRequestEmail = res.email;
                    this.sentRequestImage = res.profileImage;
                });
            }
        });
        ////getting friends via conections
        this.getFriends(); //FÜHRT DIE FUNKTION AUS IRGENDEINEM GRUND ZWEI MAL AUS
        /////                 SIEHE KONSOLE
    }
    //getting friends via connections:
    getFriends() {
        const currentUserId = this.authService.getCurrentUserId();
        this.userService.getCurrentUserConnections().subscribe(res => {
            const test = res.forEach(value => {
                if (value.groupName == '') { //filtert alle groups weg, friendships bleiben übrig
                    const users = value.users; //holt sich die user ids als Array
                    users.forEach(id => {
                        this.friendIds.push(id);
                        console.log('current value of connectionIds: ', this.friendIds);
                    });
                }
            });
            this.userService.getUsersByUserIds(this.friendIds).subscribe(res => {
                this.friends = res;
                console.log('friends: ', res); //CHECKEN WIE MAN DAS ASYNCHRON HINKRIEGT
            });
        });
    }
    getNonFriends() {
    }
    //toggle view: all, friends, groups
    selectAll() {
        if (this.allSelected == false) {
            this.allSelected = true;
            this.friendsSelected = false;
            this.groupsSelected = false;
        }
        console.log(this.allSelected, this.friendsSelected, this.groupsSelected);
    }
    selectFriends() {
        if (this.friendsSelected == false) {
            this.friendsSelected = true;
            this.allSelected = false;
            this.groupsSelected = false;
        }
        console.log(this.allSelected, this.friendsSelected, this.groupsSelected);
    }
    selectGroups() {
        if (this.groupsSelected == false) {
            this.groupsSelected = true;
            this.friendsSelected = false;
            this.allSelected = false;
        }
        console.log(this.allSelected, this.friendsSelected, this.groupsSelected);
    }
    //Vorhandene User zum Senden einer Freundschaftsanfrage per Modal anzeigen
    openAddConnection() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            console.log('Data for componentProps: ', this.friendIds);
            const modal = yield this.modalCtrl.create({
                component: _add_connection_modal_add_connection_modal_page__WEBPACK_IMPORTED_MODULE_2__.AddConnectionModalPage,
                componentProps: { friendIds: this.friendIds },
                swipeToClose: true,
                presentingElement: this.routerOutlet.nativeEl,
                cssClass: 'transparent-modal'
            });
            modal.present();
            const { data } = yield modal.onDidDismiss();
            if (data) {
                console.log('modal connectionsPage did work:', data.user.id);
                this.userService.requestConnection(data.user.id); //die id des anzufragenden Users
            } // wird an die Funktion "requestConnection()" übergeben
        });
    }
    confirmRequest() {
        this.userService.addFriend(this.receivedRequestId); //hinkünftig connectionRequestId aus dem Array connectionRequests (collection 'user') filtern
    }
    declineRequest() {
        this.userService.cleanConnectionRequests(this.receivedRequestId);
    }
};
CommunityPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonRouterOutlet },
    { type: _services_user_service__WEBPACK_IMPORTED_MODULE_3__.UserService },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__.AuthService },
    { type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_7__.Auth }
];
CommunityPage = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
        selector: 'app-community',
        template: _community_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_community_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], CommunityPage);



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

/***/ 4471:
/*!******************************************************************************************!*\
  !*** ./src/app/community/add-connection-modal/add-connection-modal.page.scss?ngResource ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = ".friends-card {\n  padding-left: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZC1jb25uZWN0aW9uLW1vZGFsLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0FBQ0oiLCJmaWxlIjoiYWRkLWNvbm5lY3Rpb24tbW9kYWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZyaWVuZHMtY2FyZCB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XHJcbn0iXX0= */";

/***/ }),

/***/ 9816:
/*!**********************************************************!*\
  !*** ./src/app/community/community.page.scss?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = ".friends-card {\n  padding-left: 1rem;\n}\n\nion-icon {\n  --ionicon-stroke-width: 16px;\n}\n\n.activated {\n  --background: #5d6770;\n  --color: #fff;\n}\n\n.inactive {\n  --background: #edefef;\n  --color: var(--ion-color-primary);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW11bml0eS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtBQUNKOztBQUNBO0VBQ0ksNEJBQUE7QUFFSjs7QUFBQTtFQUNJLHFCQUFBO0VBQ0EsYUFBQTtBQUdKOztBQURFO0VBQ0UscUJBQUE7RUFDQSxpQ0FBQTtBQUlKIiwiZmlsZSI6ImNvbW11bml0eS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZnJpZW5kcy1jYXJkIHtcclxuICAgIHBhZGRpbmctbGVmdDogMXJlbTtcclxufVxyXG5pb24taWNvbiB7XHJcbiAgICAtLWlvbmljb24tc3Ryb2tlLXdpZHRoOiAxNnB4O1xyXG59XHJcbi5hY3RpdmF0ZWQge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAjNWQ2NzcwO1xyXG4gICAgLS1jb2xvcjogI2ZmZjtcclxuICB9IFxyXG4gIC5pbmFjdGl2ZSB7XHJcbiAgICAtLWJhY2tncm91bmQ6ICNlZGVmZWY7XHJcbiAgICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgfSJdfQ== */";

/***/ }),

/***/ 2695:
/*!******************************************************************************************!*\
  !*** ./src/app/community/add-connection-modal/add-connection-modal.page.html?ngResource ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>Add a learning friend:</ion-title>\r\n    <ion-buttons slot=\"end\">\r\n      <ion-button (click)=\"close()\">Cancel</ion-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <ion-list>\r\n    <ion-radio-group (ionChange)=\"userChange($event)\">\r\n      <ion-item \r\n          *ngFor=\"let user of notConnectedUsers\" \r\n          (click)=\"selectUserName(user.name, user.email)\">\r\n        <ion-radio slot=\"start\" value=\"{{user.id}}\"></ion-radio>\r\n        <ion-avatar *ngIf=\"(user.profileImage == '')\">\r\n          <ion-icon name=\"happy-outline\" size=\"large\"></ion-icon>\r\n        </ion-avatar>        \r\n        <ion-avatar>\r\n          <ion-img [src]=\"user.profileImage\" *ngIf=\"(user.profileImage !== '')\"></ion-img>\r\n        </ion-avatar>\r\n        <ion-label class=\"friends-card\"> {{ user.name == '' ? user.email : user.name }}</ion-label>\r\n      </ion-item>\r\n    </ion-radio-group>\r\n  </ion-list>\r\n</ion-content>\r\n<ion-footer>\r\n  <div *ngIf=\"selectedUserId != ''\">\r\n    <ion-button \r\n      (click)=\"selectUser()\"\r\n      fill=\"solid\" \r\n      expand=\"block\" \r\n      color=\"secondary\">Send a friend request to <br>{{ selectedUserDisplayedString }}\r\n      <ion-icon name=\"person\" slot=\"end\"></ion-icon>\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>";

/***/ }),

/***/ 8322:
/*!**********************************************************!*\
  !*** ./src/app/community/community.page.html?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-thumbnail slot=\"start\">\r\n      <img src=\"../../assets/icon/icon.png\">\r\n    </ion-thumbnail>\r\n    <ion-title>Community</ion-title>\r\n    <ion-button \r\n        slot=\"end\" \r\n        routerLink=\"./profile\"\r\n        color=\"light\">\r\n     My profile</ion-button>   \r\n    \r\n  </ion-toolbar>\r\n  <ion-toolbar *ngIf=\"groups.length\">\r\n    <ion-segment value=\"all\">\r\n      <ion-segment-button value=\"all\" (click)=\"selectAll()\">\r\n        <ion-label>All</ion-label>\r\n      </ion-segment-button>\r\n      <ion-segment-button value=\"friends\" (click)=\"selectFriends()\">\r\n        <ion-label>Friends</ion-label>\r\n      </ion-segment-button>\r\n      <ion-segment-button value=\"groups\" (click)=\"selectGroups()\">\r\n        <ion-label>Groups</ion-label>\r\n      </ion-segment-button>\r\n    </ion-segment>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <ion-card *ngIf=\"sentRequestId != ''\">\r\n    <ion-card-subtitle>Friend request sent to:</ion-card-subtitle>\r\n    <ion-item>\r\n      <ion-icon name=\"happy-outline\" *ngIf=\"(sentRequestImage == '')\"></ion-icon>\r\n      <ion-avatar>\r\n        <ion-img [src]=\"sentRequestImage\" *ngIf=\"(sentRequestImage !== '')\"></ion-img>\r\n      </ion-avatar>\r\n      <ion-label class=\"friends-card\">{{ sentRequestEmail }}</ion-label>\r\n    </ion-item>\r\n  </ion-card>\r\n  <ion-card *ngIf=\"receivedRequestId != ''\">\r\n    <ion-card-subtitle>Friend request from:</ion-card-subtitle>\r\n    <ion-item>\r\n      <ion-icon name=\"happy-outline\" *ngIf=\"(receivedRequestImage == '')\"></ion-icon>\r\n      <ion-avatar>\r\n        <ion-img [src]=\"receivedRequestImage\" *ngIf=\"(receivedRequestImage !== '')\"></ion-img>\r\n      </ion-avatar>\r\n      <ion-label class=\"friends-card\">{{ receivedRequestEmail }}</ion-label>\r\n      <ion-icon \r\n        name=\"thumbs-down-outline\"\r\n        style=\"color: rgb(138, 14, 14); padding-right: 1rem\"\r\n        (click)=\"declineRequest()\"></ion-icon>\r\n      <ion-icon \r\n        name=\"thumbs-up-outline\" \r\n        style=\"color: rgb(17, 145, 32);\"\r\n        (click)=\"confirmRequest()\"></ion-icon>\r\n    </ion-item>\r\n  </ion-card>\r\n  <ion-row>\r\n    <ion-col size=\"6\">\r\n      <ion-button \r\n        fill=\"solid\" \r\n        expand=\"block\"\r\n        size=\"small\"\r\n        color=\"secondary\">Create a group\r\n        <ion-icon name=\"people\" slot=\"end\"></ion-icon>\r\n      </ion-button>\r\n    </ion-col>\r\n    <ion-col size=\"6\">\r\n      <ion-button \r\n        fill=\"solid\" \r\n        expand=\"block\"\r\n        size=\"small\"\r\n        color=\"secondary\"\r\n        (click)=\"openAddConnection()\">Add a friend \r\n        <ion-icon name=\"person\" slot=\"end\"></ion-icon>\r\n      </ion-button>\r\n    </ion-col>\r\n  </ion-row>\r\n\r\n<ion-item-divider *ngIf=\"this.allSelected || this.friendsSelected\" sticky=\"true\">\r\n    My learning friends\r\n</ion-item-divider>\r\n<ion-item *ngIf=\"!friends.length\" sticky=\"true\">\r\n  No learning friends yet\r\n  <ion-icon slot=\"end\" name=\"musical-notes\"></ion-icon>\r\n</ion-item>\r\n\r\n<ion-list *ngIf=\"allSelected || friendsSelected\">\r\n  <ion-item *ngFor=\"let friend of friends\" routerLink=\"./friend-detail/{{friend.id}}\">\r\n    <ion-label *ngIf=\"friend.name == '' || friend.name == null\">\r\n      <h2>{{ friend.email }}</h2>\r\n    </ion-label>\r\n    <ion-label *ngIf=\"!friend.name == '' || !friend.name == null\">\r\n      <h2>{{ friend.name }}</h2>\r\n    </ion-label>\r\n    <img \r\n      src=\"{{ friend.profileImage }}\" \r\n      *ngIf=\"(friend.profileImage !== '')\"\r\n      width=\"50px\"\r\n      slot=\"end\"/>\r\n      <img \r\n      src=\"../../assets/happy.png\" \r\n      *ngIf=\"(friend.profileImage == '')\"\r\n      width=\"50px\"\r\n      slot=\"end\"/>\r\n  </ion-item>\r\n</ion-list>\r\n<ion-item-divider *ngIf=\"this.allSelected || this.groupsSelected\" sticky=\"true\">\r\n    My learning groups\r\n</ion-item-divider>\r\n<ion-item *ngIf=\"!groups.length\">\r\n  No learning groups yet\r\n  <ion-icon slot=\"end\" name=\"musical-notes\"></ion-icon>\r\n</ion-item>\r\n<ion-list *ngFor=\"let group of groups\">\r\n  <ion-item>{{ connection.id }}</ion-item>\r\n  <ion-item>{{ connection.users }}</ion-item>\r\n</ion-list>\r\n</ion-content>\r\n";

/***/ })

}]);
//# sourceMappingURL=default-src_app_community_community_module_ts.js.map