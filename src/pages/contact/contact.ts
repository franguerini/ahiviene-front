import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  id: any;
  constructor(public navCtrl: NavController, public storage: Storage) {

  }

  cambiarId() {
    this.storage.set('userId', this.id);
  }

}
