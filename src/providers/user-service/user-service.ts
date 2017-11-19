import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  
  onBus: any;
  latLng: any;
  constructor(public geolocation: Geolocation) {
  	this.geolocation = geolocation;
  	this.onBus = undefined;
  }

  getOnBus(){
  	console.log(this.onBus);
  	return this.onBus;
  }

  setOnBus(busNumber) {
  	  	console.log(busNumber);

  	this.onBus = busNumber;
  }

  getUserPosition(){
  	return this.geolocation.getCurrentPosition().then((position) => {
      return new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  	}, (err) => {
      console.log(err);
    });

  }

}
