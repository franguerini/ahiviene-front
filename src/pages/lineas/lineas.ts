import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BusPage } from '../bus/bus';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


@Component({
  selector: 'lineas-page',
  templateUrl: 'lineas.html'
})
export class LineasPage {

	lineas =  [];

	constructor(public navCtrl: NavController, public http: Http) {
		this.navCtrl = navCtrl;
	}

    ionViewWillEnter(){
		this.getLineas();
    }


	getLineas(){
		
   		this.http.get("http://ahiviene.herokuapp.com/api/bus_lines").subscribe(
                (data: Response) => {
                	this.lineas = JSON.parse(data['_body']);
                }
            );
	}

	goToBus(bus) {
		console.log(bus);
		this.navCtrl.push(BusPage, {
			bus: bus
		});
	}

}
