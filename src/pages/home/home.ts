import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


 
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
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public storage: Storage, public http: Http) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.geolocation.getCurrentPosition().then((position) => {

      var data = {
        id : 1,
        Lat : position.coords.latitude,
        Lng: position.coords.longitude
      };

      this.http.post("http://ahiviene.herokuapp.com/users/update", JSON.stringify(data), { headers: headers }).do(res => res.json()).subscribe(
      
        data => {
               console.log(data);
          },
        err => {
               console.log(err);
         }
      );
    }, (err) => {
      console.log(err);
    }); 
    
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }


  ionViewWillEnter(){

     this.storage.get('busNumber').then((value) => {
        if(value) {
          this.busNumber = value.toString();
          let marker = new google.maps.Marker({
            position: this.latLng,
            label: this.busNumber
          });
          marker.setMap(this.map);
          this.markers.push(marker);
        }
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

    this.storage.set('busNumber', this.busNumber).then( () => {
      this.ionViewWillEnter();
    });


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