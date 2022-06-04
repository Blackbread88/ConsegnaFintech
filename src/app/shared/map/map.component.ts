import { Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as L from 'leaflet'
@Component({
  selector: 'ng-map',
  template: `
    <div #divMappa style="width: 100%; height: 300px"></div>
  `,
  styles: [
  ]
})
export class MapComponent implements OnInit {
  @ViewChild('divMappa', { static: true }) divMappa!: ElementRef<HTMLDivElement>;
  @Input() coords: number[] | undefined = undefined;
  @Input() zoom: number = 5;
  map!: L.Map;
  marker!: L.Marker;;
  constructor() { }


  ngOnInit(): void { }
  ngOnChanges(changes: SimpleChanges) {
    //console.log(changes['coords'])
    if (changes['coords'] && changes['coords'].currentValue!==null) {
      const coords: L.LatLngExpression = this.coords as L.LatLngExpression;
      if (this.map){this.map.remove();}
      this.map = L.map(this.divMappa.nativeElement).setView(coords, this.zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
        this.map
      );

      this.marker = L.marker(coords)
        .addTo(this.map)
        .openPopup();
    }

    //if (changes.coords && !changes.coords.firstChange) {
    //  const coords: L.LatLngExpression = this.location.coords as L.LatLngExpression;
    //  this.map.setView(coords);
    //  this.marker.setLatLng(coords);
    //}

    if (changes['zoom'] && this.coords!==null) {
      this.map.setZoom(changes['zoom'].currentValue);
    }
  }
}
