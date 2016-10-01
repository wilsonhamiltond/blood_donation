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
var HomeComponent = (function () {
    function HomeComponent(http) {
        this.http = http;
        this.getPoll();
    }
    HomeComponent.prototype.getPoll = function () {
        var _this = this;
        var request = this.http.get("/polls")
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.polls = res;
        }, function (error) { console.log(error); });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'v-home',
            templateUrl: 'client/modules/home/home.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map