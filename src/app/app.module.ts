import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { AppRoutingModule } from './/app-routing.module';
import { PruebaTablaComponent } from './prueba-tabla/prueba-tabla.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DynamicPipePipe } from './shared/dynamic-pipe.pipe';
import {DatePipe, PercentPipe} from "@angular/common";
import { TrabajoPipe } from './pipes/trabajo-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    PruebaTablaComponent,
    DynamicPipePipe,
    TrabajoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    DatePipe,
    PercentPipe,
    TrabajoPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
