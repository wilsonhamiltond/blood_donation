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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var VotingComponent = (function () {
    function VotingComponent(http) {
        this.http = http;
        this.logged = false;
        var token = localStorage.getItem('id_token');
        if (token) {
            var user = {};
            try {
                user = JSON.parse(token);
            }
            catch (e) { }
            if (user.name) {
                this.loggedUser = user;
                this.logged = true;
            }
        }
    }
    VotingComponent.prototype.login = function () {
        var _this = this;
        var user = {
            userName: 'wilsonhamiltond',
            name: 'Wilson Hamilton',
        };
        this.http.post('/login', user, new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Content-Type': 'application/json'
            })
        }))
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            if (!res.result)
                return;
            localStorage.setItem('id_token', JSON.stringify(res.user));
            _this.loggedUser = res.user;
            _this.logged = true;
        }, function (error) {
            console.log(error);
        });
    };
    VotingComponent.prototype.logout = function () {
        localStorage.removeItem('id_token');
        this.loggedUser = {};
        this.logged = false;
    };
    VotingComponent = __decorate([
        core_1.Component({
            selector: 'voting-app',
            templateUrl: 'client/templates/html/voting.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], VotingComponent);
    return VotingComponent;
}());
exports.VotingComponent = VotingComponent;
;
//# sourceMappingURL=voting.component.js.map