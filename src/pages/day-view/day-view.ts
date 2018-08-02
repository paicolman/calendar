import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
//import { StorePicsProvider } from '../../providers/store-pics/store-pics';
import { PickPicsProvider } from '../../providers/pick-pics/pick-pics';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { LoadingController } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';

/**
 * Generated class for the DayViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//https://firebasestorage.googleapis.com/v0/b/fir-test-c122a.appspot.com/o/sample%2FFri_Jul_06_2018.png

@IonicPage()
@Component({
  selector: 'page-day-view',
  templateUrl: 'day-view.html',
})
export class DayViewPage {
  public dayToDisplay:any;

  monthLabels = [" January "," February "," March "," April "," May "," June "," July "," August "," September "," October "," November "," December "];
  weekDayLabels = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  weekdayLabel:string;
  dayLabel:string;
  photoUrl:string;
  photoLibMsg = "messages:";
  hasFoto = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public actionSheetCtrl: ActionSheetController,
              private pickPics:PickPicsProvider, private photoViewer: PhotoViewer,public loadingCtrl: LoadingController,private afStorage: AngularFireStorage) {
    this.dayToDisplay = navParams.get("dayToDisplay");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DayViewPage');
    this.updateDayView();
  }



  updateDayView(){
    let year = this.dayToDisplay.getFullYear();
    let month = this.monthLabels[this.dayToDisplay.getMonth()];
    this.weekdayLabel = this.weekDayLabels[this.dayToDisplay.getDay()];
    this.dayLabel = this.dayToDisplay.getDate() + month + year.toString();

    //Get picture for today, if exists...
    console.log("Getting image for:"+this.dayLabel);
    //OJO: This should go to a firebase provider later...
    let imgName = "sample/"+this.dayToDisplay.toDateString().replace(/ /g,"_")+".png"; //OJO: How to find out the name: better use firebase DB
    const ref = this.afStorage.ref(imgName);
    let url = null;
    let loading = this.loadingCtrl.create({
      content: 'Loading image...'
    });
    loading.present();
    ref.getDownloadURL().toPromise().then((url) => {
      console.log('Pic found for today!!');
      this.photoUrl = url;
      this.hasFoto = true;
      loading.dismiss();
    }).catch((err) => {
      console.log("THIS IS THE ERROR:")
      console.log(err);
      console.log('no Pics for this day');
      this.photoUrl = "assets/imgs/noItems.png";
      this.hasFoto = false;
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
  }

  pickImageInBrowser(event){
    let imgName = this.dayToDisplay.toDateString().replace(/ /g,"_");
    let loading = this.loadingCtrl.create({
      content: 'Uploading image...'
    });
    loading.present();
    this.pickPics.pickImageInBrowser(event, imgName).then((result) => {
      loading.dismiss();
    });
    
  }

  getOrShow(){
    if (this.hasFoto){
      this.photoViewer.show(this.photoUrl);
    }
    else{
      this.presentActionSheet();
    }
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Add content to this day using...',
      buttons: [
        {
          text: 'Photo Library',
          handler: () => {
            this.pickPics.getPhoto();
          }
        },{
          text: 'Camera',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

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

  changeDay(event){
    console.log(event);
    if (event.deltaX < 0){
      this.increaseDay();
    }
    else{
      this.decreaseDay();
    }
  }

  increaseDay(){
    this.dayToDisplay.setDate(this.dayToDisplay.getDate() + 1);
    this.updateDayView();
    this.events.publish('date:changed',this.dayToDisplay);
  }
  decreaseDay(){
    this.dayToDisplay.setDate(this.dayToDisplay.getDate() - 1);
    this.updateDayView();
    this.events.publish('date:changed',this.dayToDisplay);
  }
}
