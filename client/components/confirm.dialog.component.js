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
var ConfirmDialogComponent = (function () {
    function ConfirmDialogComponent() {
        this.acceptConfirm = new core_1.EventEmitter();
        this.title = '';
        this.body = '';
    }
    ConfirmDialogComponent.prototype.close = function () {
        this.confirmModal.close();
    };
    ConfirmDialogComponent.prototype.show = function (title, body, obejct) {
        this.title = title;
        this.body = body;
        this.object = obejct;
        this.confirmModal.open();
    };
    ConfirmDialogComponent.prototype.accept = function () {
        this.confirmModal.close();
        this.acceptConfirm.next(this.object);
    };
    __decorate([
        core_1.ViewChild('confirmModal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], ConfirmDialogComponent.prototype, "confirmModal", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ConfirmDialogComponent.prototype, "acceptConfirm", void 0);
    ConfirmDialogComponent = __decorate([
        core_1.Component({
            selector: 'bd-confirm',
            templateUrl: 'client/components/confirm.dialog.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], ConfirmDialogComponent);
    return ConfirmDialogComponent;
}());
exports.ConfirmDialogComponent = ConfirmDialogComponent;
//# sourceMappingURL=confirm.dialog.component.js.map