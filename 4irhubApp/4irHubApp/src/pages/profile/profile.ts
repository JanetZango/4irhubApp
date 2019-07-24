import { Component,ViewChild, ElementRef, OnInit  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HubsProvider } from '../../providers/hubs/hubs';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { SigninPage } from '../signin/signin';

declare var google;
declare var firebase;
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage{
  detailArray = new Array();
  popState = 0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public hub :HubsProvider) {
 
  }

  ionViewDidEnter() {
    this.detailArray.length = 0;
    console.log('ionViewDidLoad ProfilePage');
    let userID = firebase.auth().currentUser;
    firebase.database().ref("Users/" + "/" + "App_Users/" + userID.uid).on('value', (data: any) => {
      let details = data.val();
      this.detailArray.length = 0;
      console.log(details)
      this.detailArray.push(details);
      console.log(details);
      
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  
  m = 0;

  togglePopover() {
    var popo = document.getElementById("popover")
    if (this.m == 0) {
      this.m = 1;
      popo.style.right = "0";
    }
    else {
      this.m = 0;
      popo.style.right = "-160px";
    }
  }
  removePopover() {
    this.m = 0;
    var popo = document.getElementById("popover")
    popo.style.right = "-160px";
  }
  
  showPopover(){
    this.popState =1
    console.log(this.popState);
    var thePop = document.getElementsByClassName("popover") as HTMLCollectionOf <HTMLElement>;
    let theState = this.popState;
    var setBtn = document.getElementsByClassName("settings") as HTMLCollectionOf <HTMLElement>;

    if (theState == 1){
      thePop[0].style.right = "0";
      setBtn[0].style.right = "-50px";
      thePop[0].style.zIndex = "10000000";
    }
    else{
      thePop[0].style.right = "-50%";
      setBtn[0].style.right = "10px";
    }
  }
  removePopper(){
    this.popState = 0;
    var setBtn = document.getElementsByClassName("settings") as HTMLCollectionOf <HTMLElement>;
    var thePop = document.getElementsByClassName("popover") as HTMLCollectionOf <HTMLElement>;
    let theState = this.popState;
    if (theState == 1){
      thePop[0].style.right = "0";
      thePop[0].style.opacity = "0";
      thePop[0].style.zIndex = "10000000";
      setBtn[0].style.right = "-50px";
    }
    else{
      thePop[0].style.right = "-50%";
      thePop[0].style.opacity = "1";
      thePop[0].style.zIndex = "-1000";
      setBtn[0].style.right = "-10px";
      
    }
    console.log(this.popState);
    
  }

  bodyClick(){
    this.removePopper()
  }


  logOut() {
    this.bodyClick()
    this.hub.logout().then(() => {
      this.navCtrl.push(SigninPage, { out: 'logout' });
    }, (error) => {
      console.log(error.message);
    })
  }
}
