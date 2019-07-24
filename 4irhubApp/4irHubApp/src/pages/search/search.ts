import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewPage } from '../view/view';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
name =  this.navParams.get('names');
list =  this.navParams.get('list');
progs = this.navParams.get('progs');
jobs = this.navParams.get('jobs');
serv = this.navParams.get('serv');
state = this.navParams.get('state');
items  = [];
orgType = this.navParams.get('type');
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  initializeItems() {
    this.items = this.name
  }
  serc(name){
    if (this.state == 0){
      var counter = 0;
      for (var x = 0; x < 1000; x++){
        if (this.jobs[x] != undefined){
          if (this.jobs[x].name == name){
            this.navCtrl.push(ViewPage, {obj:this.jobs[x], type:'Jobs'})
            break;
          }
        }
        if (this.progs[x] != undefined){
          if (this.progs[x].name == name){
            this.navCtrl.push(ViewPage, {obj:this.progs[x], type:'Jobs'})
            break;
          }
        }
       
        if (this.serv[x] != undefined){
          if (this.serv[x].name == name){
            this.navCtrl.push(ViewPage, {obj:this.serv[x], type:'Jobs'})
            break;
          }
        }
      }
    }
    else{
      for (var x = 0; x < this.list.length; x++){
        if (this.list[x].name == name){
          this.navCtrl.push(ViewPage, {obj:this.list[x], type:this.orgType})
          break;
        }
      }
    }
   
  }
  getItems(ev) {
    this.initializeItems();
    // set val to the value of the ev target
    var val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        console.log(val);
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else if (val == "" || val == null) {
      this.items = [];
    }
    console.log(this.items);
  }
}

