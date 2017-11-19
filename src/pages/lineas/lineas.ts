import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BusPage } from '../bus/bus';
import { Http } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


@Component({
  selector: 'lineas-page',
  templateUrl: 'lineas.html'
})
export class LineasPage {

	lineas = this.getLineas();
	constructor(public navCtrl: NavController, public http: Http) {
		this.navCtrl = navCtrl;
	}

	getLineas(){
		
   		this.http.get("http://ahiviene.herokuapp.com/bus_lines").do(res => res.json()).subscribe(
                data => {
                    console.log(data);
                },
                err => {
                    console.log(err);
                },
            );

		// return items;
	}

	goToBus(busNumber) {
		this.navCtrl.push(BusPage, {
			busNumber: busNumber
		});
	}

}
