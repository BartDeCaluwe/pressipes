import { Component } from '@angular/core';
import { Vibration } from 'ionic-native';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: './ac2015brew.html'
})
export class Ac2015brewPage {
  myTimeout: any;
  timeForTimer: number;
  timer: any;
  started: boolean = false;
  paused: boolean;
  done: boolean;
  step1: boolean = false;
  step1time: number = 15;
  step2: boolean = false;
  step2time: number = 30;
  step3: boolean = false;
  step3time: number = 10;
  step4: boolean = false;
  step4time: number = 45;
  stepTime: number;
  timeouts: any = [];

  constructor(public navCtrl: NavController) {

  }

  startTimer(timeForTimer) {
    this.started = true;
    this.timeForTimer = timeForTimer;
    this.timer = setInterval(() => {
      if (this.timeForTimer != 0) {
        this.timeForTimer -= 1;
      } else {
        clearTimeout(this.timer);
      }
    }, 1000);
  }

  pauseTimer(timeLeft) {
    this.timeForTimer = timeLeft;
    clearTimeout(this.timer);
  }

  stopTimer() {
    this.started = false;
    this.timeForTimer = 0;
    this.timeouts.forEach(element => {
      clearTimeout(element);
    });
    // clearTimeout(this.timer);
    this.clearInstructions();
  }

  brew() {
    var that = this;
    this.step1 = true;
    this.startTimer(this.step1time);
    this.stepTime = this.step1time * 1000;
    this.timeouts.push(setTimeout(function () {
      clearTimeout(that.timer);
      if (that.started) {
        window.navigator.vibrate(1000);
        that.step1 = false;
        that.step2 = true;
        that.startTimer(that.step2time);
      }
    }, this.stepTime));

    this.stepTime += (this.step2time * 1000);
    this.timeouts.push(setTimeout(function () {
      clearTimeout(that.timer);
      if (that.started) {
        window.navigator.vibrate(1000);
        that.step2 = false;
        that.step3 = true;
        that.startTimer(that.step3time);
      }
    }, this.stepTime));

    this.stepTime += (this.step3time * 1000);
    this.timeouts.push(setTimeout(function () {
      clearTimeout(that.timer);
      if (that.started) {
        window.navigator.vibrate(1000);
        that.step3 = false;
        that.step4 = true;
        that.startTimer(that.step4time);
      }
    }, this.stepTime));

    this.stepTime += (this.step4time * 1000);
    this.timeouts.push(setTimeout(function () {
      clearTimeout(that.timer);
      if (that.started) {
        window.navigator.vibrate([2000, 1000, 2000]);
        that.step4 = false;
        that.done = true;
        that.timeForTimer = 0;
      }
    }, this.stepTime));
  }

  clearInstructions() {
    this.step1 = false;
    this.step2 = false;
    this.step3 = false;
    this.step4 = false;
  }
}
