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
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var donor_model_1 = require('../models/donor.model');
var donor_service_1 = require('../services/donor.service');
var DonorComponent = (function () {
    function DonorComponent(donorForm, donorService) {
        this.donorForm = donorForm;
        this.donorService = donorService;
        this.saveDonor = new core_1.EventEmitter();
        this.address = {
            address: '',
            latitude: 0,
            longitude: 0
        };
    }
    DonorComponent.prototype.close = function () {
        this.donorModal.close();
    };
    DonorComponent.prototype.open = function (object) {
        this.address.latitude = object.latitude;
        this.address.longitude = object.longitude;
        this.donorModal.open();
    };
    DonorComponent.prototype.saveDonnor = function (form) {
        var _this = this;
        if (this.donorForm.valid) {
            this.donorForm.reset();
            form.latitude = this.address.latitude;
            form.longitude = this.address.longitude;
            this.donorService.save(form)
                .subscribe(function (res) {
                _this.close();
                _this.saveDonor.next(res);
            });
        }
    };
    __decorate([
        core_1.ViewChild('donorModal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], DonorComponent.prototype, "donorModal", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DonorComponent.prototype, "saveDonor", void 0);
    DonorComponent = __decorate([
        core_1.Component({
            selector: 'bd-donor',
            templateUrl: 'client/components/donor.component.html',
            providers: [donor_model_1.DonorModel, donor_service_1.DonorService]
        }), 
        __metadata('design:paramtypes', [donor_model_1.DonorModel, donor_service_1.DonorService])
    ], DonorComponent);
    return DonorComponent;
}());
exports.DonorComponent = DonorComponent;
//# sourceMappingURL=donor.component.js.map