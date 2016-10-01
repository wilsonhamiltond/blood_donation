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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var voting_component_1 = require('./templates/voting.component');
var routes_1 = require('./routes');
var forms_1 = require('@angular/forms');
var angular2_jwt_1 = require('angular2-jwt');
var home_module_1 = require('./modules/home/home.module');
var poll_module_1 = require('./modules/poll/poll.module');
var VotingMainModule = (function () {
    function VotingMainModule() {
    }
    VotingMainModule = __decorate([
        core_1.NgModule({
            imports: [
                routes_1.routing,
                http_1.HttpModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                home_module_1.HomeModule,
                poll_module_1.PollModule
            ],
            providers: [
                angular2_jwt_1.provideAuth({
                    globalHeaders: [{ "Content-type": "application/json" }],
                    newJwtError: true,
                    noTokenScheme: true
                })
            ],
            declarations: [voting_component_1.VotingComponent],
            bootstrap: [voting_component_1.VotingComponent],
            schemas: [
                core_1.CUSTOM_ELEMENTS_SCHEMA
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], VotingMainModule);
    return VotingMainModule;
}());
exports.VotingMainModule = VotingMainModule;
//# sourceMappingURL=voting.module.js.map