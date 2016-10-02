import { Component, ElementRef } from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
  selector: 'bd-search',
  template: '<div></div>',
  providers: [ MapService ],
  inputs: ['options']
})
export class SearchMapComponent {
  private searchOptions: any;

  constructor(private elRef:ElementRef, private _mapService:MapService) {
    this.searchOptions = {
      enableButtonMode: true, //this enables the search widget to display as a single button
      enableLabel: false,
      enableInfoWindow: true,
      showInfoWindowOnSelect: false,
    };
  }

  search: any;
  options: Object;

  // create the search dijit
  ngOnInit() {
    this.search = this._mapService.createSearch(this.options, this.elRef.nativeElement.firstChild);
  }

  // start up once the DOM is ready
  ngAfterViewInit() {
    this.search.startup();
  }

  // bind search dijit to map
  setMap(map) {
    this.search.set('map', map);
  }

  // destroy search dijit
  ngOnDestroy() {
    if (this.search) {
      this.search.destroy();
    }
  }
}
