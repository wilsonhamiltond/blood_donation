"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var angular2_toaster_1 = require('angular2-toaster/angular2-toaster');
var map_component_1 = require('./components/map.component');
var search_component_1 = require('./components/search.component');
var donor_component_1 = require('./components/donor.component');
var confirm_dialog_component_1 = require('./components/confirm.dialog.component');
var io = require('socket.io-client');
var BloodDonationComponent = (function () {
    function BloodDonationComponent(toaster) {
        this.toaster = toaster;
        this.socket = io(location.origin);
    }
    BloodDonationComponent.prototype.firstLoaded = function () {
        var isFirst = localStorage.getItem('isFirst');
        if (!isFirst) {
            localStorage.setItem('isFirst', 'true');
            this.confirmDialog.show('Welcome to blood donation', 'If you are a donor search and click on your address location for fill you information for donation else if you are a patient select a ping on the map for see the donor information.', {}, true);
        }
    };
    // once the map loads
    BloodDonationComponent.prototype.onMapLoad = function (response) {
        this.firstLoaded();
        this.map = response.map;
        // bind the search dijit to the map
        this.searchMapComponent.setMap(this.map);
        this.mapCompoenent.setBasemap('streets');
        this.getGeolocation();
        this.getDonors();
        var self = this;
        this.socket.on('donor_saved', function (donor) {
            console.log(donor);
            self.mapCompoenent.showMarkers([donor]);
        });
        this.socket.on('donor_delete', function (donor) {
            console.log(donor.firstName + ' was deleted');
            self.mapCompoenent.deleteMarker(donor);
        });
    };
    BloodDonationComponent.prototype.getDonors = function () {
        var _this = this;
        var request = this.donorComponent.donorService.gets();
        request.subscribe(function (donors) {
            _this.mapCompoenent.showMarkers(donors);
        });
    };
    BloodDonationComponent.prototype.onEditDonor = function (graphic) {
        this.showDonorPopup(graphic.node);
    };
    BloodDonationComponent.prototype.onDeleteDonor = function (graphic) {
        this.confirmDialog.show('Confirmation', 'Do you want delete the donor ' + (graphic.node.firstName + ' ' || '') + (graphic.node.lastName || ''), graphic, false);
    };
    BloodDonationComponent.prototype.onAcceptConfirm = function (graphic) {
        var _this = this;
        this.donorComponent.deleteDonor(graphic.node).
            subscribe(function (res) {
            if (res.result == true) {
                console.log(graphic.node);
                _this.toaster.pop('success', 'Success!', 'Donor delete success.!');
            }
        });
    };
    BloodDonationComponent.prototype.onMapClick = function (event) {
        var object = {
            latitude: event.mapPoint.getLatitude(),
            longitude: event.mapPoint.getLongitude()
        };
        this.showDonorPopup(object);
        /*this.mapCompoenent.getAddress(event.mapPoint).then((res)=>{
            var address = res;
        });*/
    };
    BloodDonationComponent.prototype.showDonorPopup = function (object) {
        this.donorComponent.open(object);
    };
    BloodDonationComponent.prototype.onDonorSave = function (response) {
        this.toaster.pop('success', 'Success!', 'Donor information Save success.!');
        this.socket.emit('donorSaved', response);
        console.log(response);
    };
    BloodDonationComponent.prototype.getGeolocation = function () {
        var _this = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.mapCompoenent.setPosition(position.coords);
            });
        }
        else {
            alert("Geolocation is not supported by this browser.");
        }
    };
    __decorate([
        core_1.ViewChild(map_component_1.MapComponent), 
        __metadata('design:type', map_component_1.MapComponent)
    ], BloodDonationComponent.prototype, "mapCompoenent", void 0);
    __decorate([
        core_1.ViewChild(search_component_1.SearchMapComponent), 
        __metadata('design:type', search_component_1.SearchMapComponent)
    ], BloodDonationComponent.prototype, "searchMapComponent", void 0);
    __decorate([
        core_1.ViewChild(donor_component_1.DonorComponent), 
        __metadata('design:type', donor_component_1.DonorComponent)
    ], BloodDonationComponent.prototype, "donorComponent", void 0);
    __decorate([
        core_1.ViewChild(confirm_dialog_component_1.ConfirmDialogComponent), 
        __metadata('design:type', confirm_dialog_component_1.ConfirmDialogComponent)
    ], BloodDonationComponent.prototype, "confirmDialog", void 0);
    BloodDonationComponent = __decorate([
        core_1.Component({
            selector: 'bd-app',
            templateUrl: 'client/bd.component.html',
            providers: [angular2_toaster_1.ToasterService]
        }), 
        __metadata('design:paramtypes', [angular2_toaster_1.ToasterService])
    ], BloodDonationComponent);
    return BloodDonationComponent;
}());
exports.BloodDonationComponent = BloodDonationComponent;
//# sourceMappingURL=bd.component.js.map