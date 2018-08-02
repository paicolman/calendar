import { Injectable } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker';
import { Platform } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from '../../../node_modules/rxjs';

/*
  Generated class for the PickPicsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PickPicsProvider {
  browserMode : boolean = false;
  uploadingImage:Promise<boolean>;

  constructor(private imagePicker: ImagePicker, private platform: Platform, private afStorage: AngularFireStorage) {
    console.log('Hello PickPicsProvider Provider');
    this.browserMode = (platform.is('core') || platform.is('mobileweb'));
  }

  getPhoto(){
    if(this.browserMode){   
      document.getElementById('pickImage').click();
    }
    else{
      this.imagePicker.getPictures({maximumImagesCount:1}).then((results) => {
        for (var i = 0; i < results.length; i++) {
          console.log('Image URL: ' + results[i]);
          // this.photoUrl = results[i];
          // this.storePicsProvider.set(this.dayLabel, this.photoUrl).then((res) => {
          //   console.log("Stored image in DB");
          //   this.updateDayView();
          // });
        }
      }, (err) => { });
    }
  }

  //Picks an image from the open file dialog in a desktop application and stores it in firebase (too much?)
  //OJO: This should go to a firebase provider later...
  pickImageInBrowser(event, name):Promise<boolean> {
    let imgName = name+'.'+event.target.files[0].name.split('.')[1];
    console.log("IMAGE:"+event.target.files[0]);
    return new Promise(resolve => {
      let file = event.target.files[0];
      const ref = this.afStorage.ref("sample/"+imgName);
      ref.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
        resolve(true);
      });
    });
  }

}
