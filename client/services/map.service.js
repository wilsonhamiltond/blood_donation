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
var arcgisUtils = require('esri/arcgis/utils');
var esriBasemaps = require('esri/basemaps');
var Legend = require('esri/dijit/Legend');
var Search = require('esri/dijit/Search');
var Point = require('esri/geometry/Point');
var Locator = require('esri/tasks/locator');
var PictureMarkerSymbol = require("esri/symbols/PictureMarkerSymbol");
var TextSymbol = require("esri/symbols/TextSymbol");
var Graphic = require("esri/graphic");
var MapService = (function () {
    function MapService() {
    }
    MapService.prototype.getPoint = function (coords) {
        var point = new Point(coords.longitude, coords.latitude);
        return point;
    };
    // load a web map and return respons
    MapService.prototype.createMap = function (itemIdOrInfo, domNodeOrId, options) {
        var _this = this;
        return arcgisUtils.createMap(itemIdOrInfo, domNodeOrId, options).then(function (response) {
            // append layer infos and basemap name to response before returning
            response.layerInfos = arcgisUtils.getLegendLayers(response);
            response.basemapName = _this.getBasemapName(response.map);
            return response;
        });
    };
    ;
    MapService.prototype.getAddressFromPoint = function (point) {
        var locatorUrl = 'http://serverapps101.esri.com/arcgis/rest/services/MGRS/GeocodeServer';
        var locator = new Locator(locatorUrl);
        var address = locator.locationToAddress(point, 100);
        return address;
    };
    // create a search dijit at the dom node
    MapService.prototype.createSearch = function (options, domNodeOrId) {
        return new Search(options, domNodeOrId);
    };
    ;
    // create a legend dijit at the dom node
    MapService.prototype.createLegend = function (options, domNodeOrId) {
        return new Legend(options, domNodeOrId);
    };
    ;
    // get esriBasemaps as array of basemap defintion objects
    MapService.prototype.getBasemaps = function () {
        if (!this._basemaps) {
            this._basemaps = Object.keys(esriBasemaps).map(function (name) {
                var basemap = esriBasemaps[name];
                basemap.name = name;
                return basemap;
            });
        }
        return this._basemaps;
    };
    // get the name of basemap layer
    MapService.prototype.getBasemapName = function (map) {
        var _this = this;
        var basemapName = map.getBasemap();
        if (basemapName) {
            return basemapName;
        }
        // loop through map layers
        map.layerIds.some(function (layerId) {
            var layerUrl = map.getLayer(layerId).url;
            // loop through known basemap definitions
            return _this.getBasemaps().some(function (basemapDef) {
                // loop through layers in basemap definition (isn't this fun?)
                return basemapDef.baseMapLayers.some(function (basemapDefLayer) {
                    var match = basemapDefLayer.url.toLowerCase() === layerUrl.toLowerCase();
                    if (match) {
                        basemapName = basemapDef.name;
                    }
                    return match;
                });
            });
        });
        return basemapName;
    };
    // try to remove basemap layers from map
    // if not defined, then remove the first layer
    MapService.prototype.clearBasemap = function (map) {
        if (map.basemapLayerIds && map.basemapLayerIds.length > 0) {
            map.basemapLayerIds.forEach(function (lid) {
                map.removeLayer(map.getLayer(lid));
            });
            map.basemapLayerIds = [];
        }
        else {
            map.removeLayer(map.getLayer(map.layerIds[0]));
        }
    };
    //change the selected layer visibility
    MapService.prototype.selectLayer = function (response, selectedLayer) {
        response.layerInfos.forEach(function (layerId) {
            if (selectedLayer.name === layerId.title)
                layerId.layer.setVisibility(!selectedLayer.checked);
        });
    };
    MapService.prototype.showMarkers = function (map) {
        //// adding in the markers
        var locations = [{
                latitude: 1.382,
                longitude: 103.949,
                text: 34
            }, {
                latitude: 1.380,
                longitude: 103.952,
                text: 50
            }];
        var picSymbol = new PictureMarkerSymbol('http://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png', 60, 60);
        for (var i = 0; i < locations.length; i++) {
            var geometryPoint = new Point(locations[i].longitude, locations[i].latitude);
            var textSymbol = new TextSymbol(locations[i].text).setOffset(0, -4);
            map.graphics.add(new Graphic(geometryPoint, picSymbol));
            map.graphics.add(new Graphic(geometryPoint, textSymbol));
        }
    };
    MapService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MapService);
    return MapService;
}());
exports.MapService = MapService;
//# sourceMappingURL=map.service.js.map