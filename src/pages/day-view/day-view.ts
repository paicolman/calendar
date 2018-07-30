import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { StorePicsProvider } from '../../providers/store-pics/store-pics';
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the DayViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-day-view',
  templateUrl: 'day-view.html',
})
export class DayViewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public actionSheetCtrl: ActionSheetController,
              private imagePicker: ImagePicker, private storePicsProvider:StorePicsProvider, private photoViewer: PhotoViewer) {
    this.dayToDisplay = navParams.get("dayToDisplay");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DayViewPage');
    this.updateDayView();
  }

  public dayToDisplay:any;

  monthLabels = [" January "," February "," March "," April "," May "," June "," July "," August "," September "," October "," November "," December "];
  weekDayLabels = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  weekdayLabel:string;
  dayLabel:string;
  photoUrl:string;
  photoLibMsg = "messages:";
  hasFoto = false;

  updateDayView(){
    let year = this.dayToDisplay.getFullYear();
    let month = this.monthLabels[this.dayToDisplay.getMonth()];
    this.weekdayLabel = this.weekDayLabels[this.dayToDisplay.getDay()];
    this.dayLabel = this.dayToDisplay.getDate() + month + year.toString();

    //Get picture for today, if exists...
    console.log("Getting image for:"+this.dayLabel);
    this.storePicsProvider.get(this.dayLabel).then((url) => {
      if(url == null){
        console.log('no Pics for this day');
        this.photoUrl = "assets/imgs/noItems.png";
        this.hasFoto = false;
      }
      else{
        console.log('Pic found for today!!');
        this.photoUrl = url;
        this.hasFoto = true;
      }
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
            this.getPhoto();
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

  getPhoto(){
    this.imagePicker.getPictures({maximumImagesCount:1}).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.photoUrl = results[i];
        this.storePicsProvider.set(this.dayLabel, this.photoUrl).then((res) => {
          console.log("Stored image in DB");
          this.updateDayView();
        });
      }
    }, (err) => { });
  }

  deletePhoto(){
    this.storePicsProvider.remove(this.dayLabel).then((key) => {
      console.log("Pic link deleted at key:"+key);
      this.updateDayView();
    });
  }
  deleteAll(){
    this.storePicsProvider.clear().then((res) => {
      console.log("All links deleted:"+res);
      this.updateDayView();
    });
  }

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
