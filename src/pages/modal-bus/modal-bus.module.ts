import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalBusPage } from './modal-bus';

@NgModule({
  declarations: [
    ModalBusPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalBusPage),
  ],
})
export class ModalBusPageModule {}
