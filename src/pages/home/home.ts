import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

 
declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  busNumber: number;
  storage: any;
 
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public storage: Storage) {
    this.storage = storage;  
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
 

    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.storage.get('busNumber').then((val) => {
        this.busNumber = val;
      });

      var marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        label: this.busNumber
      });
 
    }, (err) => {
      console.log(err);
    });
 
  }
 
}