import { Component, OnInit, OnDestroy, ElementRef, Output, EventEmitter  } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";

import "rxjs/add/operator/map";

import { MapService } from '../services/map.service';

@Component({
    selector: 'bd-map',
    providers: [MapService],
    template: '<div><ng-content></ng-content></div>'
})

export class MapComponent implements OnInit, OnDestroy{

    public polls: any;
    
    @Output() mapLoaded = new EventEmitter();
    @Output() mapClick = new EventEmitter();

    map: any;
    options: Object;
    itemId: string = '8e42e164d4174da09f61fe0d3f206641';
    
    setPosition(coords){
        var point = this._mapService.getPoint(coords);
        var request = this.map.centerAndZoom(point, 14);
        return request;
    }

    constructor(
        private http: Http,
        private elRef:ElementRef,
        private _mapService:MapService
    ){
        this.options = {
            basemap: 'streets',
            center: [-69.941673, 18.437890], // lon, lat
            zoom: 5
        };
    }
    
    getAddress(point){
        var address = this._mapService.getAddressFromPoint(point);
        return address;
    }

     ngOnInit() {
        // create the map
        var self = this;
        this._mapService.createMap(
            this.itemId, 
            this.elRef.nativeElement.firstChild, 
            this.options
        ).then((response) => {
            // get a reference to teh map and expose response to app
            this.map = response.map;
            
            this.map.on('click', (event) =>{
                this.mapClick.next(event);
            });

            this.mapLoaded.next(response);
        });
    }

    setBasemap(basemapName) {
        this._mapService.clearBasemap(this.map);
        this.map.setBasemap(basemapName);
    }

    showMarkers(){
        this._mapService.showMarkers(this.map);
    }

    // destroy map
    ngOnDestroy() {
        if (this.map) {
        this.map.destroy();
        }
    }
}