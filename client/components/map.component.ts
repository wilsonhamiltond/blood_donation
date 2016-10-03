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
    
    @Output() deleteGraphicClick = new EventEmitter();
    @Output() editGraphicCilck = new EventEmitter();


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

            this.map.graphics.on("click", function(e){
                //get the associated node info when the graphic is clicked
                var donor = e.graphic.node;
                
                self.map.infoWindow.setTitle("Donor Data");
                self.map.infoWindow.setContent( 
                  '<div class="col-lg-12 n-p donor-info">'+
                    '<div class="col-lg-5 n-p">Donor Name:</div>' +
                    '<div class="col-lg-7 n-p">'+
                      '<b>' + donor.firstName + ' ' + donor.lastName +'</b>'+
                    '</div>' +
                    '<div class="col-lg-5 n-p">Blood Group:</div>' +
                    '<div class="col-lg-7 n-p">'+
                      '<b>' + donor.bloodGroup+'</b>'+
                    '</div>' +
                    '<div class="col-lg-5 n-p">Email Address:</div>' +
                    '<div class="col-lg-7 n-p" >'+
                      '<a class="donor-link">Click to show</a>'+
                      '<b>' + donor.emailAddress+'</b>' +
                    '</div>' +
                    '<div class="col-lg-5 n-p">Contact Number:</div>' +
                    '<div class="col-lg-7 n-p">'+
                      '<a class="donor-link">Click to show</a>'+
                      '<b>' + donor.contactNumber+'</b>'+
                    '</div>' +
                    '<div class="col-lg-12 margin-10 n-p">'+
                      '<a id="editButton" class="btn btn-sm btn-warning"><i class="glyphicon glyphicon-pencil"></i> Edit</a>'+
                      '<a id="deleteButton" class="btn btn-sm btn-danger"><i class="glyphicon glyphicon-remove"></i> Delete</a>'+
                    '</div>'+
                  '</div>'
                );
                
                self.map.infoWindow.show(e.screenPoint, self.map.getInfoWindowAnchor(e.screenPoint));
                
                $('.donor-link').click((ae) =>{
                  $(ae.target).addClass('clicked');
                });
                
                $('#editButton').click((ae) =>{
                    self.editGraphicCilck.next(e.graphic);
                });
                
                $('#deleteButton').click((ae) =>{
                    self.deleteGraphicClick.next(e.graphic);
                });
                
                e.stopPropagation();
                e.cancelBubble = true;
            });
            this.mapLoaded.next(response);
        });
    }

    setBasemap(basemapName) {
        this._mapService.clearBasemap(this.map);
        this.map.setBasemap(basemapName);
    }

    showMarkers(donors){
        this._mapService.showMarkers(this.map, donors);
    }
    
    deleteMarker(graphic){
        this._mapService.deleteMarker(this.map, graphic);
    }

    // destroy map
    ngOnDestroy() {
        if (this.map) {
        this.map.destroy();
        }
    }
}