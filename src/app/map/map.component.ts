import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';

import { MapService } from './map.service';
import { GeocodingService } from './geocoding.service';
import { Location } from "./location.class";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private mapService: MapService, private geocoder: GeocodingService) { }

  ngOnInit() {
    let map = L.map("map", {
      zoomControl: false,
      center: L.latLng(40.731253, -73.996139),
      zoom: 12,
      minZoom: 4,
      maxZoom: 19,
      layers: [this.mapService.baseMaps.OpenStreetMap]
    });

    L.control.zoom({ position: "topright" }).addTo(map);
    L.control.layers(this.mapService.baseMaps).addTo(map);
    L.control.scale().addTo(map);

    this.mapService.map = map;
    this.geocoder.getCurrentLocation()
      .subscribe(
        location => map.panTo([location.latitude, location.longitude]),
        err => console.error(err)
      );
  }

}
