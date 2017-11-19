import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage) {
  	this.busNumber = navParams.get('busNumber');
  }


  enterBus() {
    let alert = this.alertCtrl.create({
      title: 'Te subiste al ' + this.busNumber,
      subTitle: 'Estas compartiendo la ubicacion a la comunidad, no olvides avisar cuando te bajes.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.storage.set('busNumber', this.busNumber);
          }
        }
        ]
    });
    alert.present();
  }

}
