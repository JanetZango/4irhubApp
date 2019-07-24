import { Component ,ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the OnboardingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {

  slides_ = [
    {
      title: "Welcome to the <br> 4IRhub App",
      //description: "<b>In Business and Life</b>",
      // image: "../../assets/imgs/407893.png",
    },
    {
      title: "Jobs",
      description: '"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae earum reprehenderit in consequatur labore dignissimos "',
      image: "../../assets/imgs/onboarding-removebg-preview 2.jpeg",
    },
    {
      title: "Map",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae earum reprehenderit in consequatur repudiandae </b>. ",
      image: "../../assets/imgs/onboarding-removebg-preview.jpeg",
    },
    {
      title: "Wi-Fi",
      description: "<b>Locate the closet </b> <br> consectetur adipisicing elit. Molestiae earum reprehenderit ",
      image: "../../assets/imgs/Wifi-1-icon.png",
    }
  ];

  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }

  goToNextSlide(){
    this.slides.slideNext()
}
goToRegistration(){
  this.navCtrl.push(HomePage)
}
}
