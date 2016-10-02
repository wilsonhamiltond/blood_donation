import { Component, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import {ToasterService} from 'angular2-toaster/angular2-toaster';

import { MapComponent} from './components/map.component';
import { SearchMapComponent} from './components/search.component';
import { DonorComponent} from './components/donor.component';

@Component({
    selector: 'bd-app',
    templateUrl: 'client/bd.component.html',
    providers: [ToasterService] 
})
export class BloodDonationComponent{
    @ViewChild(MapComponent) mapCompoenent: MapComponent;
    @ViewChild(SearchMapComponent) searchMapComponent: SearchMapComponent;
    @ViewChild(DonorComponent) donorComponent: DonorComponent;

    map: any;

    constructor(private toaster: ToasterService){
    }

    // once the map loads
    onMapLoad(response) {
        this.map = response.map;

        // bind the search dijit to the map
        this.searchMapComponent.setMap(this.map);
        /*// initialize the leged dijit with map and layer infos
        this.legendComponent.init(map, response.layerInfos);
        // set the selected basemap
        this.basemapSelect.selectedBasemap = response.basemapName;
        // bind the map title
        this.title = response.itemInfo.item.title;
        //bind the legendlayer
        this.LayerComponent.init(response);*/
        this.mapCompoenent.setBasemap('streets');
        this.getGeolocation();
        this.mapCompoenent.showMarkers();
    }
    
    onMapClick(event){
        var object = {
            latitude: event.mapPoint.y,
            longitude: event.mapPoint.x
        };
        this.showDonorPopup(object);
        this.mapCompoenent.getAddress(event.mapPoint).then((res)=>{
            var address = res;
        });
    }

    showDonorPopup(object){
        this.donorComponent.open(object);
    }

    onDonorSave(response){
        this.toaster.pop( 'success', 'Success!', 'Donor information Save success.!');
        console.log(response);
    }

    getGeolocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.mapCompoenent.setPosition( position.coords );
            });
        } else {
            alert( "Geolocation is not supported by this browser.");
        }
    }
};