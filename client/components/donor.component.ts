import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { DonorModel } from '../models/donor.model';
import { DonorService } from '../services/donor.service';

import { Control } from '@angular/forms';

@Component({
    selector: 'bd-donor',
    templateUrl: 'client/components/donor.component.html',
    providers: [DonorModel, DonorService]
})
export class DonorComponent{
    @ViewChild('donorModal')
    donorModal: ModalComponent;
    address: any;

    @Output() saveDonor = new EventEmitter();
    constructor( 
        private donorForm: DonorModel,
        public donorService: DonorService){
            this.address = {
                address: '',
                latitude: 0,
                longitude: 0
            };
    }

    close() {
        this.donorForm.reset();
        this.donorModal.close();
    }

    open(object) { 
        this.address.latitude = object.latitude;
        this.address.longitude = object.longitude;
        if( object._id){
            for( var prop in object){
                if(this.donorForm.controls.hasOwnProperty(prop)){
                    this.donorForm.controls[prop].setValue( object[prop] );
                }
            }
        }
        this.donorModal.open();
    } 
    deleteDonor(donor){
        return this.donorService.delete(donor);
    }
    saveDonnor(form: any): void{
        if( this.donorForm.valid ){
            this.donorForm.reset();
            form.latitude = this.address.latitude;
            form.longitude = this.address.longitude;
            this.donorService.save(form)
            .subscribe((res) => {
                this.close();
                this.saveDonor.next(res);
            })
        }
  }
}