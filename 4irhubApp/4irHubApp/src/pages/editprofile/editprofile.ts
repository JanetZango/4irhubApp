import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, ToastController, LoadingController } from 'ionic-angular';
import { HubsProvider } from '../../providers/hubs/hubs';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
  mypic: any;
  contact;
  downloadurl;
  name;
  email;
  uid;
  address;
  imageArr = new Array();
  tempImg;
  surname;
  mobileNumber;
  dateOfBirth;
  d = 1;
  ageToday;
  dateOfGraduation;
  constructor(public navCtrl: NavController, public navParams: NavParams,public hub :HubsProvider,public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
   
  }

  ionViewDidLoad() {
 
    console.log('ionViewDidLoad EditprofilePage');
  }

  GoToProfile(){
    this.navCtrl.push(ProfilePage)
  }

  ngOnInit() {
    this.hub.retrieve().on('value', (data: any) => {
      let details = data.val();
      this.name = details.name;
      this.email = details.email;
      this.address = details.address;
      this.surname = details.surname;
      this.downloadurl = details.downloadurl;
      this.tempImg = details.downloadurl;
      if (this.address == null || this.address == undefined) {
        this.address = "";
      }
      if (this.surname == null || this.surname == undefined) {
        this.surname = "";
      }
    })
  }


  insertpic(event: any) {

    this.d = 1;

    let opts = document.getElementsByClassName('options') as HTMLCollectionOf<HTMLElement>;

    if (this.d == 1) {
      // opts[0].style.top = "10vh";
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();

        if (event.target.files[0].size > 1500000) {
          let alert = this.alertCtrl.create({
            title: "Oh no!",
            subTitle: "your photo is too large, please choose a photo with 1.5MB or less.",
            buttons: ['OK']
          });
          alert.present();
        }
        else {
          reader.onload = (event: any) => {
            this.downloadurl = event.target.result;
          }
          reader.readAsDataURL(event.target.files[0]);
        }

      }

    }
  }


  


  uploadPicture() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait...',
      duration: 4000000
    });
    loading.present();

      console.log('added to db');
      this.hub.update(this.name, this.email, this.downloadurl,this.address,this.mobileNumber,this.dateOfBirth,this.ageToday,this.dateOfGraduation).then((data) => {
        this.imageArr.push(data);
      });
      console.log(this.imageArr);
      loading.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Profile successfully updated!',
        duration: 3000
      });
      toast.present();
      this.navCtrl.pop();


  }

}
