import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as tt from '@tomtom-international/web-sdk-maps';

@Component({
  selector: 'app-map',
  template: `
    <link rel="stylesheet" href="https://api.tomtom.com/maps-sdk-for-web/cdn/5.x/5.69.1/maps/maps.css" />
    <div #mapElement style="height: 400px; width: 100%; border-radius: 40px;"></div>
  `,
})
export class MapComponent implements OnInit {
  @ViewChild('mapElement', { static: true }) mapElement: any;
  @Input() jobCity!: string;

  coordinates: { latitude: number; longitude: number } ={latitude:34.14870852372886,longitude:9.656299900658828};
  marker: any;

  async ngOnInit() {
    if (this.jobCity) {
      try {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${this.jobCity}&limit=1&type=state&bias=countrycode:auto&format=json&apiKey=202681b96dd14d578735547c71124cf2


        `);
        console.log('Response:', response.url);
        const data = await response.json();
        console.log('Data:', data)
        if (data && data.results) {
          const lat = data.results[0].lat
          const lon = data.results[0].lon
          this.coordinates = { latitude: parseFloat(lat), longitude: parseFloat(lon) };
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }
    if (this.coordinates) {
      const { latitude, longitude } = this.coordinates;
      console.log(this.coordinates.latitude, this.coordinates.longitude) 
      const map = tt.map({
        key: '2CPyYA7yzdIAlunNbTDh5X2LGnTKZ1Jt',
        container: this.mapElement.nativeElement,
        center: [longitude, latitude],
        zoom: 14,
      });
      this.marker = new tt.Marker().setLngLat([longitude, latitude]).addTo(map);
    }

  }
}
