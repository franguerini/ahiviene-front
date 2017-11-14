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

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  	this.busNumber = navParams.get('busNumber');
  	storage.ready().then(() => {
	  	storage.set('busNumber', this.busNumber);
	});
  }

  ionViewDidLoad() {

  }
}
