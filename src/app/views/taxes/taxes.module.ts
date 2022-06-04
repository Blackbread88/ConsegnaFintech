import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxesRoutingModule } from './taxes-routing.module';
import { TaxesComponent } from './taxes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/materials/material.module';
import { ValidatorsModule } from 'src/app/shared/validators/validators.module';


@NgModule({
  declarations: [
    TaxesComponent
  ],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule, ValidatorsModule
  ]
})
export class TaxesModule { }
