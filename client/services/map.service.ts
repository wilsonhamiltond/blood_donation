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
  emailClicked: false;
  getPoint(coords){
    
    var point = new Point(coords.longitude, coords.latitude );

    return point;
  }

  // load a web map and return respons
  createMap(itemIdOrInfo: any, domNodeOrId: any, options: Object) {
      return arcgisUtils.createMap(itemIdOrInfo, domNodeOrId, options).then(response => {
      return response;
    });
  };
  
  changeClass(){
    this.emailClicked = true;
  }

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

  showMarkers(map, donors){
    var picSymbol = new PictureMarkerSymbol('./assets/img/blood-donation.png', 60, 60);
    if( donors.length == 1){
        map.graphics.graphics.forEach((graphic) =>{
          if(graphic.node){
            if( graphic.node._id == donors[0]._id){
              map.graphics.remove( graphic );
              map.infoWindow.hide();
            }
          }
        });
    }
    donors.forEach((donor)=>{
          var geometryPoint = new Point(donor.longitude, donor.latitude);
          /*var textSymbol = new TextSymbol('').setOffset(0, -4);
          map.graphics.add(new Graphic(geometryPoint, picSymbol));*/
          var graphic = new Graphic(geometryPoint, picSymbol);
          graphic.node = donor;
          map.graphics.add( graphic );
    });
  }
  
  deleteMarker(map, donor){
    map.graphics.graphics.forEach((graphic) =>{
      if(graphic.node){
        if( graphic.node._id == donor._id){
          map.graphics.remove( graphic );
          map.infoWindow.hide();
        }
      }
    });
  }
}