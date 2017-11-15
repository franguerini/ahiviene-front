import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the BusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bus',
  templateUrl: 'bus.html',
})
export class BusPage {
  busNumber: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  	this.storage = storage;
  	this.busNumber = navParams.get('busNumber');
	this.storage.set('busNumber', this.busNumber);
  }

  ionViewDidLoad() {

  }
}
