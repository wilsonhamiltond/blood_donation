import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { routing } from './routes';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing
    ],
    declarations: [HomeComponent],
    bootstrap: [HomeComponent]
})
export class HomeModule{};