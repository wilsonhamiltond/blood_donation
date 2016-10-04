import { Component, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import {ToasterService} from 'angular2-toaster/angular2-toaster';

import { MapComponent} from './components/map.component';
import { SearchMapComponent} from './components/search.component';
import { DonorComponent} from './components/donor.component';
import { ConfirmDialogComponent } from './components/confirm.dialog.component';

import * as io from 'socket.io-client';

@Component({
    selector: 'bd-app',
    templateUrl: 'client/bd.component.html',
    providers: [ToasterService]
})
export class BloodDonationComponent{
    @ViewChild(MapComponent) mapCompoenent: MapComponent;
    @ViewChild(SearchMapComponent) searchMapComponent: SearchMapComponent;
    @ViewChild(DonorComponent) donorComponent: DonorComponent;
    @ViewChild(ConfirmDialogComponent) confirmDialog: ConfirmDialogComponent;

    map: any;
    socket: any;
    constructor(
        private toaster: ToasterService
    ){
        this.socket = io(location.origin);
    }
    firstLoaded(){
        var isFirst = localStorage.getItem('isFirst');
        if( !isFirst){
            localStorage.setItem('isFirst', 'true');
            
            this.confirmDialog.show(
                'Welcome to blood donation', 
                'If you are a donor search and click on your address location for fill you information for donation else if you are a patient select a ping on the map for see the donor information.',
                {}, true);
        }
    }
    // once the map loads
    onMapLoad(response) {
        this.firstLoaded();
        this.map = response.map;

        // bind the search dijit to the map
        this.searchMapComponent.setMap(this.map);
        
        this.mapCompoenent.setBasemap('streets');
        this.getGeolocation();
        this.getDonors();
        var self = this;
        this.socket.on('donor_saved', function(donor){
            console.log(donor);
            self.mapCompoenent.showMarkers([donor]);
        });
        this.socket.on('donor_delete', function(donor){
            console.log(donor.firstName + ' was deleted');
            self.mapCompoenent.deleteMarker(donor);
        });
    }
    getDonors(){
        var request = this.donorComponent.donorService.gets();
        request.subscribe((donors) => {
            this.mapCompoenent.showMarkers(donors);
        });
    }
    onEditDonor(graphic){
        this.showDonorPopup(graphic.node);
    }
    
    onDeleteDonor(graphic){
        this.confirmDialog.show(
            'Confirmation', 
            'Do you want delete the donor ' + (graphic.node.firstName  + ' '|| '') + (graphic.node.lastName || ''),
            graphic, false);
    }
    
    onAcceptConfirm(graphic){
        this.donorComponent.deleteDonor(graphic.node).
            subscribe( (res) =>{
                if( res.result == true){
                    console.log(graphic.node);
                    this.toaster.pop( 'success', 'Success!', 'Donor delete success.!');
                }
            });
    }
    
    onMapClick(event){
        var object = {
            latitude: event.mapPoint.getLatitude(),
            longitude: event.mapPoint.getLongitude()
        };
        this.showDonorPopup(object);
        /*this.mapCompoenent.getAddress(event.mapPoint).then((res)=>{
            var address = res;
        });*/
    }

    showDonorPopup(object){
        this.donorComponent.open(object);
    }

    onDonorSave(response){
        this.toaster.pop( 'success', 'Success!', 'Donor information Save success.!');
        
        this.socket.emit('donorSaved',  response);
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
}