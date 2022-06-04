import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './cards.component';
import { MaterialModule } from 'src/app/shared/materials/material.module';
import { CardFormComponent } from './components/card-form.component';
import { CardListComponent } from './components/card-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CardsComponent,
    CardFormComponent,
    CardListComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    CardsRoutingModule,
    FormsModule,
  ]
})
export class CardsModule { }
