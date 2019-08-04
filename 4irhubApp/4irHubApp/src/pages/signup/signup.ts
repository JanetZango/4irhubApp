import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Keyboard} from 'ionic-angular';
import { HubsProvider } from '../../providers/hubs/hubs';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { SigninPage } from '../signin/signin';


declare var firebase;
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public hub :HubsProvider,public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,private keyboard: Keyboard,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  SignUp(email,password,name) {
    if(email == "" || password== "" || email == null || password == null ){
      console.log('error')
    }
    else{
      this.hub.Signup(email,password,name).then(() => {
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          subTitle: "We have sent you a link on your email, Please verify your email",
          buttons: [
            {
              text: 'Ok',
              handler: () => {
            this.navCtrl.push(SigninPage)

              }
            },
          ]
        });
        alert.present();

      }, (error) => {
        console.log(error.message);
      })
    }
  }

  switchlogin(){
    this.navCtrl.push(SigninPage)
  }
}
