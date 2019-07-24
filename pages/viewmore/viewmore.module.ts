import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewmorePage } from './viewmore';

@NgModule({
  declarations: [
    ViewmorePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewmorePage),
  ],
})
export class ViewmorePageModule {}
