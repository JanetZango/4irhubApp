import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// import { Keyboard } from '@ionic-native/keyboard';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ViewPage } from '../pages/view/view';
import { ProfilePage } from '../pages/profile/profile';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { HubsProvider } from '../providers/hubs/hubs';
import { Geolocation } from '@ionic-native/geolocation';
import { SearchPage } from '../pages/search/search';
import { ViewmorePage } from '../pages/viewmore/viewmore';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { EditprofilePage } from '../pages/editprofile/editprofile';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ViewPage,
    ProfilePage,
    SigninPage,
    SignupPage,
    SearchPage,
    ViewmorePage,
    OnboardingPage,
    EditprofilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ViewPage,
    ProfilePage,
    SigninPage,
    SignupPage,
    SearchPage,
    ViewmorePage,
    OnboardingPage,
    EditprofilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HubsProvider,
    Geolocation,
    // Keyboard

  ]
})
export class AppModule { }
