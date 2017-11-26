import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { Http , RequestOptions} from '@angular/http';
import { Headers } from '@angular/http';
import { BusPage } from '../bus/bus';
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
  busName: any;
  latLng: any;
  markers: any = [];
  userId: any = 8;
  busId: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public storage: Storage, public alertCtrl: AlertController, public http: Http) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.storage.get('userId').then((id) => {
      if(!id) {
        this.userId = 8;
        this.storage.set('userId', this.userId);
      } else {
        this.userId = id; 
      }
      this.http.get("http://ahiviene.herokuapp.com/api/users/me" , {params: {id: this.userId.toString()}}).subscribe(
                (data) => {
                  let userInfo = JSON.parse(data['_body']);
                  this.busName = userInfo.bus_line_name;
                  this.storage.set('busName', this.busName);

                   setInterval( () => {
                    this.geolocation.getCurrentPosition().then((position) => {

                    var data = {
                      id : id,
                      lat : position.coords.latitude,
                      lng: position.coords.longitude,
                    };

                    this.http.post("https://ahiviene.herokuapp.com/api/users/update", JSON.stringify(data), options).subscribe(
                      data => {
                            console.log(data);
                            this.resetMarkers(position);
                        },
                      err => {
                             console.log(err);
                       }
                    );
                  }, (err) => {
                    console.log(err);
                  }); 
                }, 10000);
                });
                }
              );
    
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }

  ionViewWillEnter() {
    this.storage.get('busName').then((value) => {
      if(value) {
        this.busName = value.toString();
      }
    });
  }

  resetMarkers(position){

    this.deleteMarkers();

    const nav = this.navCtrl;

    if(this.userId) {
        this.http.get("http://ahiviene.herokuapp.com/api/buses?user_id=" + this.userId.toString()).subscribe(
                    (data) => {
                      let buses = JSON.parse(data['_body']);
                      let i = 0;
                      
                      for (i = 0; i < buses.length; i++) {
                        let bus = buses[i];
                         let latLngBus = new google.maps.LatLng(buses[i].lat, buses[i].lng);
                         console.log(latLngBus);
                         let marker = new google.maps.Marker({
                            position: latLngBus,
                            label: buses[i].name
                          });
                        marker.addListener('click', function() {
                          console.log(bus);
                           nav.push(BusPage, {
                             busId: bus.id,
                             bus: bus
                            });
                         });


                        marker.setMap(this.map);
                        this.markers.push(marker);
                      }


                      this.storage.get('busName').then((value) => {
                      if(value) {
                        let latLngUser = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        this.busName = value.toString();
                        let userMarker = new google.maps.Marker({
                          position: latLngUser
                        });
                      userMarker.setIcon('http://maps.google.com/mapfiles/marker_green.png');
                      userMarker.setMap(this.map);
                      this.markers.push(userMarker);
                     }
                    });
                  });      
    }

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

      this.busName = 'A pie';

      this.storage.set('busName', this.busName);

      this.resetMarkers(position);
 
    }, (err) => {
      console.log(err);
    });
 
  }

  getOffBus(){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.storage.get('userId').then((id) => {

      var data = {
          user_id : id,
        };

      this.http.post("https://ahiviene.herokuapp.com/api/users/off_bus", JSON.stringify(data), options).subscribe(
                data => {
                     let alert = this.alertCtrl.create({
                      title: 'Te bajaste del ' + this.busName,
                      subTitle: 'Gracias por colaborar con tu ubicacion con la comunidad! Hasta la proxima!',
                       buttons: [
                          {
                           text: 'OK',
                          }
                        ]
                      });
                      alert.present();
                      this.busName = 'A pie';

                      this.storage.set('busName', this.busName);
                  },
                err => {
                       console.log(err);
                 }
              );
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