import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorePicsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorePicsProvider {

  constructor(public storage: Storage) {
    console.log('Hello StorePicsProvider Provider');
    console.log(this.storage);
  }

  public set(dateStamp, picUrl){
      return this.storage.set(dateStamp, picUrl);
  }

  public get(dateStamp){
      return this.storage.get(dateStamp);
  }

  public remove(dateStamp){
      return this.storage.remove(dateStamp);
  }

  public clear(){
      return this.storage.clear();
  }
}
