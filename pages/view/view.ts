import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {
  readMore ="read more";
  pet = "Services";
  data = this.navParams.get('obj');
  img;
  name;
  cell;
  desc;
  bene;
  address;
  email;
  background;
  orgType = this.navParams.get('type');
  type = ''
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(this.data);
    this.background = this.data.background;
    this.img = this.data.img;
    this.name = this.data.name;
    this.cell = this.data.contacts;
    this.desc = this.data.desc;
    this.bene = this.data.benefits;
    this.address = this.data.address;
    this.email = this.data.email;

  }
  
  s = 0;
  toggleShowMore(){
    var toggler = document.getElementById("description");
    if(this.s == 0){
      this.s = 1;
      toggler.style.maxHeight = "1000px";
      this.readMore = "read less"
    }
    else{
      this.s = 0;
      toggler.style.maxHeight = "40px";
      this.readMore = "read more"
    }
  }

}
