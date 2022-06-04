import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialModule } from './materials/material.module';
import { ModalMsgboxComponent } from './modal-msgbox/modal-msgbox.component';
import { RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    NavigationComponent,
    ModalMsgboxComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[
    NavigationComponent,
    ModalMsgboxComponent,
    MapComponent
  ]
})
export class SharedModule { }
