import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { summaryForJitFileName } from '@angular/compiler/src/aot/util';
import { ViewPage } from '../view/view';

/**
 * Generated class for the ViewmorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewmore',
  templateUrl: 'viewmore.html',
})
export class ViewmorePage {
  images=[
    {image:'../../assets/imgs/South-African-Parliament-AT-1030x691.jpg'},
    {image:'../../assets/imgs/Austria_Parlament_Front.jpg'},
    {image:'../../assets/imgs/unnamed.jpg'},
    {image:'../../assets/imgs/South-African-Parliament-AT-1030x691.jpg'},
    {image:'../../assets/imgs/Austria_Parlament_Front.jpg'},
  ]
  type = this.navParams.get('type');
  list = this.navParams.get('list');
  loading;
  names =  new Array();
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait...',
    });
    this.loading.present();
    this.setNames();
  }

  viewMore(obj){
    this.navCtrl.push(ViewPage, {obj:obj, type:this.type})
  }

  setNames(){
    for (var x = 0; x < this.list.length; x++){
      this.names.push(this.list[x].name)
    }
    this.loading.dismiss();
  }
  search(){
    this.navCtrl.push(SearchPage, {names:this.names, list:this.list, type:this.type})
  }
}
