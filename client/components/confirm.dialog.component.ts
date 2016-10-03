import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector:'bd-confirm',
    templateUrl: 'client/components/confirm.dialog.component.html',
})
export class ConfirmDialogComponent {
    @ViewChild('confirmModal')
    confirmModal: ModalComponent
    @Output()
    acceptConfirm = new EventEmitter();
    
    public title: String = '';
    public body: String = '';
    public object: any;
    constructor( 
        ) {
            
        }
    close() { 
        this.confirmModal.close();
    }
    show(title, body, obejct) { 
        this.title = title;
        this.body = body;
        this.object = obejct;
        this.confirmModal.open();
    }
    accept(){
        this.confirmModal.close();
        this.acceptConfirm.next(this.object);
    }
}