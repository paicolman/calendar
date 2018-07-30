webpackJsonp([1],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DayViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_image_picker__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_store_pics_store_pics__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_photo_viewer__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the DayViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DayViewPage = /** @class */ (function () {
    function DayViewPage(navCtrl, navParams, events, actionSheetCtrl, imagePicker, storePicsProvider, photoViewer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.actionSheetCtrl = actionSheetCtrl;
        this.imagePicker = imagePicker;
        this.storePicsProvider = storePicsProvider;
        this.photoViewer = photoViewer;
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
        this.storePicsProvider.get(this.dayLabel).then(function (url) {
            if (url == null) {
                console.log('no Pics for this day');
                _this.photoUrl = "assets/imgs/noItems.png";
                _this.hasFoto = false;
            }
            else {
                console.log('Pic found for today man!!');
                _this.photoUrl = url;
                _this.hasFoto = true;
            }
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
                        _this.getPhoto();
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
    DayViewPage.prototype.getPhoto = function () {
        var _this = this;
        this.imagePicker.getPictures({ maximumImagesCount: 1 }).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
                _this.photoUrl = results[i];
                _this.storePicsProvider.set(_this.dayLabel, _this.photoUrl).then(function (res) {
                    console.log("Stored image in DB");
                    _this.updateDayView();
                });
            }
        }, function (err) { });
    };
    DayViewPage.prototype.deletePhoto = function () {
        var _this = this;
        this.storePicsProvider.remove(this.dayLabel).then(function (key) {
            console.log("Pic link deleted at key:" + key);
            _this.updateDayView();
        });
    };
    DayViewPage.prototype.deleteAll = function () {
        var _this = this;
        this.storePicsProvider.clear().then(function (res) {
            console.log("All links deleted:" + res);
            _this.updateDayView();
        });
    };
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
            selector: 'page-day-view',template:/*ion-inline-start:"/Users/jorge/Desktop/ionic/calendar/src/pages/day-view/day-view.html"*/'<!--\n  Generated template for the DayViewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Calendatach!</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div calendar="" class="calendar ng-isolate-scope" id="calendar">\n  	<div class="header" (swipe)="changeDay($event)">\n  		<div class="date">{{dayLabel}}</div>\n      <div class="weekday">{{weekdayLabel}}</div>\n  		<div class="right" (click)="increaseDay()"></div>\n  		<div class="left" (click)="decreaseDay()"></div>\n  	</div>\n  </div>\n  <div class="week-days">\n    <img (click)="getOrShow()" src={{photoUrl}} alt="">\n  </div>\n  <div *ngIf="hasFoto">\n    <button ion-button (click)="deletePhoto()">Delete</button>\n    <button ion-button (click)="getPhoto()">Replace</button>\n    <button ion-button (click)="deleteAll()">Clear all</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/jorge/Desktop/ionic/calendar/src/pages/day-view/day-view.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_image_picker__["a" /* ImagePicker */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_image_picker__["a" /* ImagePicker */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__providers_store_pics_store_pics__["a" /* StorePicsProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_store_pics_store_pics__["a" /* StorePicsProvider */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_photo_viewer__["a" /* PhotoViewer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_photo_viewer__["a" /* PhotoViewer */]) === "function" && _g || Object])
    ], DayViewPage);
    return DayViewPage;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=day-view.js.map

/***/ }),

/***/ 110:
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
webpackEmptyAsyncContext.id = 110;

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/day-view/day-view.module": [
		276,
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
webpackAsyncContext.id = 151;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorePicsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(155);
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

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__day_view_day_view__ = __webpack_require__(101);
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
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]) === "function" && _b || Object])
    ], HomePage);
    return HomePage;
    var _a, _b;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(222);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_photo_viewer__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_day_view_day_view__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_store_pics_store_pics__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





//import { PhotoLibrary } from '@ionic-native/photo-library';







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_day_view_day_view__["a" /* DayViewPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/day-view/day-view.module#DayViewPageModule', name: 'DayViewPage', segment: 'day-view', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_day_view_day_view__["a" /* DayViewPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_photo_viewer__["a" /* PhotoViewer */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__providers_store_pics_store_pics__["a" /* StorePicsProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(198);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[199]);
//# sourceMappingURL=main.js.map