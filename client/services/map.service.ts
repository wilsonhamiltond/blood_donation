import { Injectable } from '@angular/core';
import arcgisUtils = require('esri/arcgis/utils');
import esriBasemaps = require('esri/basemaps');
import Legend = require('esri/dijit/Legend');
import Search = require('esri/dijit/Search');
import {LegendOptions} from "esri";
import Point = require( 'esri/geometry/Point' );
import Locator = require('esri/tasks/locator');
import PictureMarkerSymbol = require( "esri/symbols/PictureMarkerSymbol");
import TextSymbol = require( "esri/symbols/TextSymbol" );
import TextSymbol = require( "esri/symbols/TextSymbol" );
import Graphic = require( "esri/graphic");


@Injectable()
export class MapService {
  _basemaps: any[];

  getPoint(coords){
    
    var point = new Point(coords.longitude, coords.latitude );

    return point;
  }

  // load a web map and return respons
  createMap(itemIdOrInfo: any, domNodeOrId: any, options: Object) {
    return arcgisUtils.createMap(itemIdOrInfo, domNodeOrId, options).then(response => {
      // append layer infos and basemap name to response before returning
      response.layerInfos = arcgisUtils.getLegendLayers(response);
      response.basemapName = this.getBasemapName(response.map);
      return response;
    });
  };

  getAddressFromPoint(point){
    var locatorUrl = 'http://serverapps101.esri.com/arcgis/rest/services/MGRS/GeocodeServer';
    var locator = new Locator(locatorUrl);
    var address = locator.locationToAddress(point, 100);
    return address;
  }

  // create a search dijit at the dom node
  createSearch(options: Object, domNodeOrId: any) {
    return new Search(options, domNodeOrId);
  };

  // create a legend dijit at the dom node
  createLegend(options: LegendOptions, domNodeOrId: any) {
    return new Legend(options, domNodeOrId);
  };

  // get esriBasemaps as array of basemap defintion objects
  getBasemaps() {
    if (!this._basemaps) {
      this._basemaps = Object.keys(esriBasemaps).map((name) => {
        let basemap = esriBasemaps[name];
        basemap.name = name;
        return basemap;
      });
    }
    return this._basemaps;
  }

  // get the name of basemap layer
  getBasemapName(map) {
    let basemapName = map.getBasemap();
    if (basemapName) {
      return basemapName;
    }
    // loop through map layers
    map.layerIds.some(layerId => {
      const layerUrl = map.getLayer(layerId).url;
      // loop through known basemap definitions
      return this.getBasemaps().some(basemapDef => {
        // loop through layers in basemap definition (isn't this fun?)
        return basemapDef.baseMapLayers.some(basemapDefLayer => {
          const match = basemapDefLayer.url.toLowerCase() === layerUrl.toLowerCase();
          if (match) {
            basemapName = basemapDef.name;
          }
          return match;
        });
      });
    });
    return basemapName;
  }

  // try to remove basemap layers from map
  // if not defined, then remove the first layer
  clearBasemap(map) {
    if (map.basemapLayerIds && map.basemapLayerIds.length > 0) {
      map.basemapLayerIds.forEach(function(lid) {
        map.removeLayer(map.getLayer(lid));
      });
      map.basemapLayerIds = [];
    } else {
      map.removeLayer(map.getLayer(map.layerIds[0]));
    }
  }
  //change the selected layer visibility
  selectLayer(response, selectedLayer){ 
    response.layerInfos.forEach(layerId =>{
      if (selectedLayer.name===layerId.title)
      layerId.layer.setVisibility(!selectedLayer.checked);
    });
  }

  showMarkers(map){
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
      var picSymbol = new PictureMarkerSymbol(
              'http://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png', 60, 60);
      
      for (var i = 0; i < locations.length; i++) {
          var geometryPoint = new Point(locations[i].longitude, locations[i].latitude);
          var textSymbol = new TextSymbol(locations[i].text).setOffset(0, -4);
          map.graphics.add(new Graphic(geometryPoint, picSymbol));
          map.graphics.add(new Graphic(geometryPoint, textSymbol));
      }
}
}