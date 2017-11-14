import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BusPage } from '../bus/bus';



@Component({
  selector: 'lineas-page',
  templateUrl: 'lineas.html'
})
export class LineasPage {

	lineas = this.getLineas();
	constructor(public navCtrl: NavController) {
	  	
	}

	getLineas(){
		var bus130 = {
			number: 130,
			color: 'yellow'
		};
		var bus61 = {
			number: 61,
			color: 'red'
		};
		var bus152 = {
			number: 152,
			color: 'blue'
		}

		var items = [
			bus130,
			bus61,
			bus152
		];
		return items;
	}

	goToBus(busNumber, public navCtrl: NavController) {
		console.log(busNumber);
		this.navCtrl.push(BusPage, {
			busNumber: busNumber
		});
	}

}
