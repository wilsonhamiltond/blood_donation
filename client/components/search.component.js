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
var map_service_1 = require('../services/map.service');
var SearchMapComponent = (function () {
    function SearchMapComponent(elRef, _mapService) {
        this.elRef = elRef;
        this._mapService = _mapService;
        this.searchOptions = {
            enableButtonMode: true,
            enableLabel: false,
            enableInfoWindow: true,
            showInfoWindowOnSelect: false,
        };
    }
    // create the search dijit
    SearchMapComponent.prototype.ngOnInit = function () {
        this.search = this._mapService.createSearch(this.options, this.elRef.nativeElement.firstChild);
    };
    // start up once the DOM is ready
    SearchMapComponent.prototype.ngAfterViewInit = function () {
        this.search.startup();
    };
    // bind search dijit to map
    SearchMapComponent.prototype.setMap = function (map) {
        this.search.set('map', map);
    };
    // destroy search dijit
    SearchMapComponent.prototype.ngOnDestroy = function () {
        if (this.search) {
            this.search.destroy();
        }
    };
    SearchMapComponent = __decorate([
        core_1.Component({
            selector: 'bd-search',
            template: '<div></div>',
            providers: [map_service_1.MapService],
            inputs: ['options']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, map_service_1.MapService])
    ], SearchMapComponent);
    return SearchMapComponent;
}());
exports.SearchMapComponent = SearchMapComponent;
//# sourceMappingURL=search.component.js.map