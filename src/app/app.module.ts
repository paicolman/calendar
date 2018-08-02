import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ImagePicker } from '@ionic-native/image-picker';
import { IonicStorageModule } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer';
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyBc5_SoVmpgszyzgGxu-QWqo2Qf4VEHXwg",
  authDomain: "fir-test-c122a.firebaseapp.com",
  databaseURL: "https://fir-test-c122a.firebaseio.com/",
  projectId: "fir-test-c122a",
  storageBucket: "fir-test-c122a.appspot.com",
  messagingSenderId: "140383526187"
}

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DayViewPage } from '../pages/day-view/day-view';
import { StorePicsProvider } from '../providers/store-pics/store-pics';
import { PickPicsProvider } from '../providers/pick-pics/pick-pics';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DayViewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DayViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    PhotoViewer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorePicsProvider,
    PickPicsProvider
  ]
})
export class AppModule {}
