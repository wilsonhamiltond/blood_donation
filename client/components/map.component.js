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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var map_service_1 = require('../services/map.service');
var MapComponent = (function () {
    function MapComponent(http, elRef, _mapService) {
        this.http = http;
        this.elRef = elRef;
        this._mapService = _mapService;
        this.mapLoaded = new core_1.EventEmitter();
        this.mapClick = new core_1.EventEmitter();
        this.itemId = '8e42e164d4174da09f61fe0d3f206641';
        this.options = {
            basemap: 'streets',
            center: [-69.941673, 18.437890],
            zoom: 5
        };
    }
    MapComponent.prototype.setPosition = function (coords) {
        var point = this._mapService.getPoint(coords);
        var request = this.map.centerAndZoom(point, 14);
        return request;
    };
    MapComponent.prototype.getAddress = function (point) {
        var address = this._mapService.getAddressFromPoint(point);
        return address;
    };
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        // create the map
        var self = this;
        this._mapService.createMap(this.itemId, this.elRef.nativeElement.firstChild, this.options).then(function (response) {
            // get a reference to teh map and expose response to app
            _this.map = response.map;
            _this.map.on('click', function (event) {
                _this.mapClick.next(event);
            });
            _this.mapLoaded.next(response);
        });
    };
    MapComponent.prototype.setBasemap = function (basemapName) {
        this._mapService.clearBasemap(this.map);
        this.map.setBasemap(basemapName);
    };
    MapComponent.prototype.showMarkers = function () {
        this._mapService.showMarkers(this.map);
    };
    // destroy map
    MapComponent.prototype.ngOnDestroy = function () {
        if (this.map) {
            this.map.destroy();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MapComponent.prototype, "mapLoaded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MapComponent.prototype, "mapClick", void 0);
    MapComponent = __decorate([
        core_1.Component({
            selector: 'bd-map',
            providers: [map_service_1.MapService],
            template: '<div><ng-content></ng-content></div>'
        }), 
        __metadata('design:paramtypes', [http_1.Http, core_1.ElementRef, map_service_1.MapService])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map