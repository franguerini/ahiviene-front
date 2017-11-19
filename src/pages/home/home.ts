import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  markers: any = [];
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public storage: Storage) {
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }


  ionViewWillEnter(){
    this.deleteMarkers();
      this.storage.get('busNumber').then((value) => {
        this.busNumber = value.toString();
        let marker = new google.maps.Marker({
          position: this.latLng,
          label: value.toString()
        });
        marker.setMap(this.map);
        this.markers.push(marker);
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

      this.busNumber = 'A pie';

      this.storage.set('busNumber', this.busNumber);

      this.ionViewWillEnter();
 
    }, (err) => {
      console.log(err);
    });
 
  }

  getOffBus(){
    this.busNumber = 'A pie';

    this.storage.set('busNumber', this.busNumber);

    this.ionViewWillEnter();

  }
 
  deleteMarkers() {
        this.setMapOnAll(null);
        this.markers = [];
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
}