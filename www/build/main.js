webpackJsonp([1],{

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DayViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_pick_pics_pick_pics__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_photo_viewer__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_storage__ = __webpack_require__(130);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { StorePicsProvider } from '../../providers/store-pics/store-pics';




/**
 * Generated class for the DayViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//https://firebasestorage.googleapis.com/v0/b/fir-test-c122a.appspot.com/o/sample%2FFri_Jul_06_2018.png
var DayViewPage = /** @class */ (function () {
    function DayViewPage(navCtrl, navParams, events, actionSheetCtrl, pickPics, photoViewer, loadingCtrl, afStorage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.actionSheetCtrl = actionSheetCtrl;
        this.pickPics = pickPics;
        this.photoViewer = photoViewer;
        this.loadingCtrl = loadingCtrl;
        this.afStorage = afStorage;
        this.monthLabels = [" January ", " February ", " March ", " April ", " May ", " June ", " July ", " August ", " September ", " October ", " November ", " December "];
        this.weekDayLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.photoLibMsg = "messages:";
        this.hasFoto = false;
        this.dayToDisplay = navParams.get("dayToDisplay");
    }
    DayViewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DayViewPage');
        this.updateDayView();
    };
    DayViewPage.prototype.updateDayView = function () {
        var _this = this;
        var year = this.dayToDisplay.getFullYear();
        var month = this.monthLabels[this.dayToDisplay.getMonth()];
        this.weekdayLabel = this.weekDayLabels[this.dayToDisplay.getDay()];
        this.dayLabel = this.dayToDisplay.getDate() + month + year.toString();
        //Get picture for today, if exists...
        console.log("Getting image for:" + this.dayLabel);
        //OJO: This should go to a firebase provider later...
        var imgName = "sample/" + this.dayToDisplay.toDateString().replace(/ /g, "_") + ".png"; //OJO: How to find out the name: better use firebase DB
        var ref = this.afStorage.ref(imgName);
        var url = null;
        var loading = this.loadingCtrl.create({
            content: 'Loading image...'
        });
        loading.present();
        ref.getDownloadURL().toPromise().then(function (url) {
            console.log('Pic found for today!!');
            _this.photoUrl = url;
            _this.hasFoto = true;
            loading.dismiss();
        }).catch(function (err) {
            console.log("THIS IS THE ERROR:");
            console.log(err);
            console.log('no Pics for this day');
            _this.photoUrl = "assets/imgs/noItems.png";
            _this.hasFoto = false;
            loading.dismiss();
        });
        //Old version: storing URL locally...
        // this.storePicsProvider.get(this.dayLabel).then((url) => {
        //   if(url == null){
        //     console.log('no Pics for this day');
        //     this.photoUrl = "assets/imgs/noItems.png";
        //     this.hasFoto = false;
        //   }
        //   else{
        //     console.log('Pic found for today!!');
        //     this.photoUrl = url;
        //     this.hasFoto = true;
        //   }
        // });
    };
    DayViewPage.prototype.pickImageInBrowser = function (event) {
        var imgName = this.dayToDisplay.toDateString().replace(/ /g, "_");
        var loading = this.loadingCtrl.create({
            content: 'Uploading image...'
        });
        loading.present();
        this.pickPics.pickImageInBrowser(event, imgName).then(function (result) {
            loading.dismiss();
        });
    };
    DayViewPage.prototype.getOrShow = function () {
        if (this.hasFoto) {
            this.photoViewer.show(this.photoUrl);
        }
        else {
            this.presentActionSheet();
        }
    };
    DayViewPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Add content to this day using...',
            buttons: [
                {
                    text: 'Photo Library',
                    handler: function () {
                        _this.pickPics.getPhoto();
                    }
                }, {
                    text: 'Camera',
                    handler: function () {
                        console.log('Archive clicked');
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    // deletePhoto(){
    //   this.storePicsProvider.remove(this.dayLabel).then((key) => {
    //     console.log("Pic link deleted at key:"+key);
    //     this.updateDayView();
    //   });
    // }
    // deleteAll(){
    //   this.storePicsProvider.clear().then((res) => {
    //     console.log("All links deleted:"+res);
    //     this.updateDayView();
    //   });
    // }
    DayViewPage.prototype.changeDay = function (event) {
        console.log(event);
        if (event.deltaX < 0) {
            this.increaseDay();
        }
        else {
            this.decreaseDay();
        }
    };
    DayViewPage.prototype.increaseDay = function () {
        this.dayToDisplay.setDate(this.dayToDisplay.getDate() + 1);
        this.updateDayView();
        this.events.publish('date:changed', this.dayToDisplay);
    };
    DayViewPage.prototype.decreaseDay = function () {
        this.dayToDisplay.setDate(this.dayToDisplay.getDate() - 1);
        this.updateDayView();
        this.events.publish('date:changed', this.dayToDisplay);
    };
    DayViewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-day-view',template:/*ion-inline-start:"/Users/jorge/Desktop/ionic/calendar/src/pages/day-view/day-view.html"*/'<!--\n  Generated template for the DayViewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Calendatach!</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div calendar="" class="calendar ng-isolate-scope" id="calendar">\n  	<div class="header" (swipe)="changeDay($event)">\n  		<div class="date">{{dayLabel}}</div>\n      <div class="weekday">{{weekdayLabel}}</div>\n  		<div class="right" (click)="increaseDay()"></div>\n  		<div class="left" (click)="decreaseDay()"></div>\n  	</div>\n  </div>\n  <div class="week-days">\n    <img (click)="getOrShow()" src={{photoUrl}} alt="">\n  </div>\n  <div *ngIf="hasFoto">\n    <button ion-button (click)="deletePhoto()">Delete</button>\n    <button ion-button (click)="getPhoto()">Replace</button>\n    <button ion-button (click)="deleteAll()">Clear all</button>\n  </div>\n  <input id="pickImage" type="file" style="display: none" (change)="pickImageInBrowser($event)" >\n</ion-content>\n'/*ion-inline-end:"/Users/jorge/Desktop/ionic/calendar/src/pages/day-view/day-view.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__providers_pick_pics_pick_pics__["a" /* PickPicsProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_pick_pics_pick_pics__["a" /* PickPicsProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_photo_viewer__["a" /* PhotoViewer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_photo_viewer__["a" /* PhotoViewer */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4_angularfire2_storage__["a" /* AngularFireStorage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angularfire2_storage__["a" /* AngularFireStorage */]) === "function" && _h || Object])
    ], DayViewPage);
    return DayViewPage;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=day-view.js.map

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 186;

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/day-view/day-view.module": [
		493,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 227;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PickPicsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_image_picker__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_storage__ = __webpack_require__(130);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the PickPicsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var PickPicsProvider = /** @class */ (function () {
    function PickPicsProvider(imagePicker, platform, afStorage) {
        this.imagePicker = imagePicker;
        this.platform = platform;
        this.afStorage = afStorage;
        this.browserMode = false;
        console.log('Hello PickPicsProvider Provider');
        this.browserMode = (platform.is('core') || platform.is('mobileweb'));
    }
    PickPicsProvider.prototype.getPhoto = function () {
        if (this.browserMode) {
            document.getElementById('pickImage').click();
        }
        else {
            this.imagePicker.getPictures({ maximumImagesCount: 1 }).then(function (results) {
                for (var i = 0; i < results.length; i++) {
                    console.log('Image URL: ' + results[i]);
                    // this.photoUrl = results[i];
                    // this.storePicsProvider.set(this.dayLabel, this.photoUrl).then((res) => {
                    //   console.log("Stored image in DB");
                    //   this.updateDayView();
                    // });
                }
            }, function (err) { });
        }
    };
    //Picks an image from the open file dialog in a desktop application and stores it in firebase (too much?)
    //OJO: This should go to a firebase provider later...
    PickPicsProvider.prototype.pickImageInBrowser = function (event, name) {
        var _this = this;
        var imgName = name + '.' + event.target.files[0].name.split('.')[1];
        console.log("IMAGE:" + event.target.files[0]);
        return new Promise(function (resolve) {
            var file = event.target.files[0];
            var ref = _this.afStorage.ref("sample/" + imgName);
            ref.put(file).then(function (snapshot) {
                console.log('Uploaded a blob or file!');
                resolve(true);
            });
        });
    };
    PickPicsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_storage__["a" /* AngularFireStorage */]])
    ], PickPicsProvider);
    return PickPicsProvider;
}());

//# sourceMappingURL=pick-pics.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__day_view_day_view__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.events = events;
        //dayView = DayViewPage;
        this.weeks = [1, 2, 3, 4, 5];
        this.days = [0, 1, 2, 3, 4, 5, 6];
        this.dayLabels = [];
        this.monthLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.weekDayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        this.monthIndex = 0;
        this.year = 0;
        this.slideMode = "header";
        this.monthToDisplay = new Date();
        events.subscribe('date:changed', function (newDate) {
            _this.monthToDisplay = newDate;
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Home(MonthView)');
        this.updateMonthView(this.monthToDisplay);
        this.monthToDisplay.setDate(1); //Set to the first of the month to allow for smooth back-and-forth of months
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.updateMonthView(this.monthToDisplay);
        this.monthToDisplay.setDate(1); //Set to the first of the month to allow for smooth back-and-forth of months
    };
    HomePage.prototype.updateMonthView = function (month) {
        this.dayLabels = [];
        this.monthIndex = month.getMonth();
        this.year = month.getFullYear();
        var lastDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);
        var lastDay = lastDate.getDate();
        var firstDate = new Date(month.getFullYear(), month.getMonth(), 1);
        var firstWeekDay = firstDate.getDay();
        //Calculate how many weeks need to be iterated (4,5 or 6)
        //February starting on monday and not leap-year: 4 weeks)
        if ((month.getMonth() === 1) && (lastDay === 28) && (firstWeekDay === 0)) {
            this.weeks = [1, 2, 3, 4];
        }
        //31-day month starting on saturday or 30-day month starting on sunday: 6 weeks
        if (((lastDay === 30) && (firstWeekDay === 6)) || ((lastDay === 31) && (firstWeekDay > 4))) {
            this.weeks = [1, 2, 3, 4, 5, 6];
        }
        for (var idx = 0; idx < firstWeekDay; idx++) {
            this.dayLabels.push("");
        }
        for (var idx = 1; idx <= lastDay; idx++) {
            var strDate = ("0" + idx).substr(-2);
            this.dayLabels.push(strDate);
        }
        console.log("month:" + this.monthToDisplay);
    };
    HomePage.prototype.changeMonth = function (event) {
        if (event.deltaX < 0) {
            this.increaseMonth();
        }
        else {
            this.decreaseMonth();
        }
    };
    HomePage.prototype.increaseMonth = function () {
        var _this = this;
        this.slideMode = "header slideleft";
        this.monthToDisplay.setMonth(this.monthToDisplay.getMonth() + 1);
        this.updateMonthView(this.monthToDisplay);
        setTimeout(function () { _this.slideMode = "header"; console.log(_this.slideMode); }, 500);
    };
    HomePage.prototype.decreaseMonth = function () {
        var _this = this;
        this.slideMode = "header slideright";
        this.monthToDisplay.setMonth(this.monthToDisplay.getMonth() - 1);
        this.updateMonthView(this.monthToDisplay);
        setTimeout(function () { _this.slideMode = "header"; console.log(_this.slideMode); }, 500);
    };
    HomePage.prototype.switchToDayView = function (dayClicked) {
        var dayNr = Number(dayClicked);
        if (dayNr > 0) {
            this.monthToDisplay.setDate(dayNr);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__day_view_day_view__["a" /* DayViewPage */], { dayToDisplay: this.monthToDisplay });
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/jorge/Desktop/ionic/calendar/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Calendattach!\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div calendar="" class="calendar" id="calendar">\n  	<div [ngClass]="slideMode" (swipe)="changeMonth($event)">\n  		<div class="month">{{monthLabels[monthIndex]}}</div>\n  		<div class="year">{{year}}</div>\n  		<!--div class="ring-left"></div-->\n  		<!--div class="ring-right"></div-->\n  		<div class="right" (click)="increaseMonth()"></div>\n  		<div class="left" (click)="decreaseMonth()"></div>\n  	</div>\n  	<div class="week-days">\n  		<span *ngFor="let dayLabel of weekDayLabels; let idx = index" class="day">{{weekDayLabels[(idx)]}}</span>\n  	</div>\n  	<div class="week-days">\n  		<div *ngFor="let week of weeks; let w = index" class="week">\n  			<div *ngFor="let day of days; let d = index" class="day" style="cursor: default;">\n  				<span class="circle" style="transform: scale(0, 0);"></span>\n  				<div class="day-number" (click) = "switchToDayView(dayLabels[(w*7)+d])">{{dayLabels[(w*7)+d]}}</div>\n  			</div>\n  		</div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/jorge/Desktop/ionic/calendar/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(411);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_photo_viewer__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_storage__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_day_view_day_view__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_store_pics_store_pics__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_pick_pics_pick_pics__ = __webpack_require__(228);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








// Import the AF2 Module




// AF2 Settings
var firebaseConfig = {
    apiKey: "AIzaSyBc5_SoVmpgszyzgGxu-QWqo2Qf4VEHXwg",
    authDomain: "fir-test-c122a.firebaseapp.com",
    databaseURL: "https://fir-test-c122a.firebaseio.com/",
    projectId: "fir-test-c122a",
    storageBucket: "fir-test-c122a.appspot.com",
    messagingSenderId: "140383526187"
};





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_day_view_day_view__["a" /* DayViewPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/day-view/day-view.module#DayViewPageModule', name: 'DayViewPage', segment: 'day-view', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__["a" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__["a" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_10_angularfire2_storage__["b" /* AngularFireStorageModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_day_view_day_view__["a" /* DayViewPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_photo_viewer__["a" /* PhotoViewer */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_15__providers_store_pics_store_pics__["a" /* StorePicsProvider */],
                __WEBPACK_IMPORTED_MODULE_16__providers_pick_pics_pick_pics__["a" /* PickPicsProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(287);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/jorge/Desktop/ionic/calendar/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/jorge/Desktop/ionic/calendar/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorePicsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(279);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the StorePicsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var StorePicsProvider = /** @class */ (function () {
    function StorePicsProvider(storage) {
        this.storage = storage;
        console.log('Hello StorePicsProvider Provider');
        console.log(this.storage);
    }
    StorePicsProvider.prototype.set = function (dateStamp, picUrl) {
        return this.storage.set(dateStamp, picUrl);
    };
    StorePicsProvider.prototype.get = function (dateStamp) {
        return this.storage.get(dateStamp);
    };
    StorePicsProvider.prototype.remove = function (dateStamp) {
        return this.storage.remove(dateStamp);
    };
    StorePicsProvider.prototype.clear = function () {
        return this.storage.clear();
    };
    StorePicsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], StorePicsProvider);
    return StorePicsProvider;
}());

//# sourceMappingURL=store-pics.js.map

/***/ })

},[288]);
//# sourceMappingURL=main.js.map