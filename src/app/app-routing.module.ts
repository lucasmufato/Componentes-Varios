import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TableComponent} from './table/table.component';
import {PruebaTablaComponent} from "./prueba-tabla/prueba-tabla.component";

const routes: Routes = [
  { path: 'tabla', component: PruebaTablaComponent}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
