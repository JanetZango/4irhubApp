import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ViewPage } from '../pages/view/view';
import { ProfilePage } from '../pages/profile/profile';
import { SigninPage } from '../pages/signin/signin';
import { HubsProvider } from '../providers/hubs/hubs';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { timer } from 'rxjs/observable/timer';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  showSplash = true;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public hub:HubsProvider) {
    platform.ready().then(() => {
      
      hub.checkstate().then((data: any) => {
        if (data == 1) {
          this.rootPage = HomePage
        }
        else {
          this.rootPage = SigninPage
        }
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false)
    });
  }
}

