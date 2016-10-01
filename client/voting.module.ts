import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'
import { VotingComponent } from './templates/voting.component';
import { routing  } from './routes';
import { FormsModule } from '@angular/forms';
import { provideAuth } from 'angular2-jwt';

import { HomeModule } from './modules/home/home.module';
import { PollModule } from './modules/poll/poll.module';

@NgModule({
    imports: [
        routing,
        HttpModule,
        BrowserModule,
        FormsModule,
        HomeModule,
        PollModule
    ],
    providers: [
        provideAuth({
            globalHeaders: [{"Content-type": "application/json"}],
            newJwtError: true,
            noTokenScheme: true
        })
    ],
    declarations: [VotingComponent],
    bootstrap: [VotingComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class VotingMainModule{}