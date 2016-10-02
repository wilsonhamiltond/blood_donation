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
var BloodDonationComponent = (function () {
    function BloodDonationComponent(toaster) {
        this.toaster = toaster;
    }
    // once the map loads
    BloodDonationComponent.prototype.onMapLoad = function (response) {
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
    };
    BloodDonationComponent.prototype.onMapClick = function (event) {
        var object = {
            latitude: event.mapPoint.y,
            longitude: event.mapPoint.x
        };
        this.showDonorPopup(object);
        this.mapCompoenent.getAddress(event.mapPoint).then(function (res) {
            var address = res;
        });
    };
    BloodDonationComponent.prototype.showDonorPopup = function (object) {
        this.donorComponent.open(object);
    };
    BloodDonationComponent.prototype.onDonorSave = function (response) {
        this.toaster.pop('success', 'Success!', 'Donor information Save success.!');
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
;
//# sourceMappingURL=bd.component.js.map