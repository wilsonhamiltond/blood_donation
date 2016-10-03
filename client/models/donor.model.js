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
var forms_1 = require('@angular/forms');
var DonorModel = (function () {
    function DonorModel(fb) {
        return fb.group({
            '_id': '',
            'firstName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(20)])],
            'lastName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(20)])],
            'contactNumber': [null, DonorModel.phone],
            'emailAddress': [null, DonorModel.email],
            'bloodGroup': [null, forms_1.Validators.compose([forms_1.Validators.required])],
        });
    }
    DonorModel.phone = function (control) {
        //Skip validation if empty, to handle optional fields
        var phoneNumber = /(\+|[0]{2})[\d]{2} [\d]{3} [\d]{4} [\d]{3}/g;
        if (!control.value) {
            return null;
        }
        var valid = phoneNumber.test(control.value);
        if (valid) {
            return null;
        }
        return { "invalid": true };
    };
    DonorModel.email = function (control) {
        //Skip validation if empty, to handle optional fields
        var emailAddress = /\w+@+[a-zA-z]+?\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?/g;
        if (!control.value) {
            return null;
        }
        var valid = emailAddress.test(control.value);
        if (valid) {
            return null;
        }
        return { "invalid": true };
    };
    DonorModel = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], DonorModel);
    return DonorModel;
}());
exports.DonorModel = DonorModel;
//# sourceMappingURL=donor.model.js.map