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
  busNumber: any;
  latLng: any;
 
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public storage: Storage) {
    this.storage = storage; 
    this.navCtrl = navCtrl; 
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }

  ionViewWillEnter(){
      this.storage.get('busNumber').then((val) => {
        if(val) {
          this.busNumber = val.toString();
        } else {
          this.busNumber = "A pie";
        }
      });
      console.log(this.busNumber);
      new google.maps.Marker({
        position: this.latLng,
        map: this.map,
        label: this.busNumber
      });

  }
 
  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: this.latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.ionViewWillEnter();
 
    }, (err) => {
      console.log(err);
    });
 
  }
 
}