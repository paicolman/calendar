import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//import { PhotoLibrary } from '@ionic-native/photo-library';
import { ImagePicker } from '@ionic-native/image-picker';
import { IonicStorageModule } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DayViewPage } from '../pages/day-view/day-view';
import { StorePicsProvider } from '../providers/store-pics/store-pics';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DayViewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    StorePicsProvider
  ]
})
export class AppModule {}
