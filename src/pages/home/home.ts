import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { DayViewPage } from '../day-view/day-view';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public events:Events) {
    this.monthToDisplay = new Date();
    events.subscribe('date:changed', (newDate) => {
      this.monthToDisplay = newDate;
    });
  }
  monthToDisplay:any;
  //dayView = DayViewPage;
  weeks = [1,2,3,4,5];
  days = [0,1,2,3,4,5,6];
  dayLabels = [];
  monthLabels = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  weekDayLabels = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  monthIndex = 0;
  year = 0;
  slideMode = "header";

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home(MonthView)');
    this.updateMonthView(this.monthToDisplay);
    this.monthToDisplay.setDate(1); //Set to the first of the month to allow for smooth back-and-forth of months
  }

  ionViewWillEnter(){
    this.updateMonthView(this.monthToDisplay);
    this.monthToDisplay.setDate(1); //Set to the first of the month to allow for smooth back-and-forth of months
  }

  updateMonthView(month){
    this.dayLabels = [];
    this.monthIndex = month.getMonth();
    this.year = month.getFullYear();
    let lastDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    let lastDay = lastDate.getDate();
    let firstDate = new Date(month.getFullYear(), month.getMonth(), 1);
    let firstWeekDay = firstDate.getDay();
    //Calculate how many weeks need to be iterated (4,5 or 6)
    //February starting on monday and not leap-year: 4 weeks)
    if((month.getMonth() === 1) && (lastDay === 28) && (firstWeekDay === 0)){
      this.weeks = [1,2,3,4];
    }
    //31-day month starting on saturday or 30-day month starting on sunday: 6 weeks
    if(((lastDay === 30) && (firstWeekDay === 6)) || ((lastDay === 31) && (firstWeekDay > 4))){
      this.weeks = [1,2,3,4,5,6];
    }
    for(let idx = 0; idx < firstWeekDay; idx++){
      this.dayLabels.push("");
    }
    for (let idx = 1; idx <= lastDay; idx++){
      let strDate = ("0"+idx).substr(-2);
      this.dayLabels.push(strDate);
    }
    console.log("month:"+this.monthToDisplay);
  }

  changeMonth(event){
    if (event.deltaX < 0){
      this.increaseMonth();
    }
    else{
      this.decreaseMonth();
    }
  }

  increaseMonth(){
    this.slideMode = "header slideleft";
    this.monthToDisplay.setMonth(this.monthToDisplay.getMonth() + 1);
    this.updateMonthView(this.monthToDisplay);
    setTimeout(() => {this.slideMode = "header"; console.log(this.slideMode);},500);
  }
  decreaseMonth(){
    this.slideMode = "header slideright";
    this.monthToDisplay.setMonth(this.monthToDisplay.getMonth() - 1);
    this.updateMonthView(this.monthToDisplay);
    setTimeout(() => {this.slideMode = "header"; console.log(this.slideMode);},500);
  }

  switchToDayView(dayClicked){
    let dayNr = Number(dayClicked);
    if(dayNr > 0){
      this.monthToDisplay.setDate(dayNr);
      this.navCtrl.push(DayViewPage, { dayToDisplay:this.monthToDisplay });
    }
  }
}
