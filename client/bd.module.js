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
var bd_component_1 = require('./bd.component');
var forms_1 = require('@angular/forms');
var map_component_1 = require('./components/map.component');
var search_component_1 = require('./components/search.component');
var donor_component_1 = require('./components/donor.component');
var confirm_dialog_component_1 = require('./components/confirm.dialog.component');
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var angular2_toaster_1 = require('angular2-toaster/angular2-toaster');
var BloodDonationMainModule = (function () {
    function BloodDonationMainModule() {
    }
    BloodDonationMainModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng2_bs3_modal_1.Ng2Bs3ModalModule,
                angular2_toaster_1.ToasterModule
            ],
            declarations: [
                bd_component_1.BloodDonationComponent,
                map_component_1.MapComponent,
                search_component_1.SearchMapComponent,
                donor_component_1.DonorComponent,
                confirm_dialog_component_1.ConfirmDialogComponent
            ],
            bootstrap: [bd_component_1.BloodDonationComponent],
            schemas: [
                core_1.CUSTOM_ELEMENTS_SCHEMA
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], BloodDonationMainModule);
    return BloodDonationMainModule;
}());
exports.BloodDonationMainModule = BloodDonationMainModule;
//# sourceMappingURL=bd.module.js.map