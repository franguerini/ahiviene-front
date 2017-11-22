import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Http , RequestOptions} from '@angular/http';
import {Headers} from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-bus',
  templateUrl: 'bus.html',
})
export class BusPage {

  bus: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage, public http: Http) {
  	this.bus = navParams.get('bus');
  }


  enterBus() {

    this.storage.get('userId').then((id) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      
        var data = {
            user_id : id,
            bus_line_id: this.bus.id,
          };


        this.http.post("https://ahiviene.herokuapp.com/api/users/on_bus", JSON.stringify(data), options).subscribe(
              data => {
                    console.log(data);
                    let alert = this.alertCtrl.create({
                    title: 'Te subiste al ' + this.bus.name,
                    subTitle: 'Estas compartiendo la ubicacion a la comunidad, no olvides avisar cuando te bajes.',
                    buttons: [
                      {
                        text: 'OK',
                        handler: () => {
                          this.storage.set('busName', this.bus.name);
                        }
                      }
                      ]
                  });
                alert.present();
                },
              err => {
                  console.log(err);
               }
            ); 
      });
    }
}
