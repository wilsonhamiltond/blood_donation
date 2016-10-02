import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BloodDonationComponent } from './bd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MapComponent} from './components/map.component';
import { SearchMapComponent} from './components/search.component';
import { DonorComponent} from './components/donor.component';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import {ToasterModule} from 'angular2-toaster/angular2-toaster';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2Bs3ModalModule,
        ToasterModule
    ],
    declarations: [
        BloodDonationComponent,
        MapComponent,
        SearchMapComponent,
        DonorComponent
    ],
    bootstrap: [BloodDonationComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class BloodDonationMainModule{}