import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public emailComposer: EmailComposer, public callNumber: CallNumber) {
  }
  ionViewDidLoad() {
    console.log(this.data);
    this.background = this.data.background;
    this.img = this.data.img;
    this.name = this.data.name;
    this.cell = this.data.contact;
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

  
  call(cell) {
    console.log(cell);

    this.callNumber.callNumber(cell, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  Email(emails) {
    let email = {
      to: emails,
      cc: [],
      bcc: [],
      attachment: [],
      subject: '',
      body: '',
      isHtml: false,
      app: 'Gmail'
    };
    // Send a text message using default options
    this.emailComposer.open(email);
  }
}
