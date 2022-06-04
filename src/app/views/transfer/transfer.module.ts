import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferRoutingModule } from './transfer-routing.module';
import { DialogContactsDialog, TransferComponent } from './transfer.component';
import { ContactsComponent } from './components/contacts.component';
import { ContactsListComponent } from './components/contacts-list.component';
import { ContactFormComponent } from './components/contact-form.component';
import { MaterialModule } from 'src/app/shared/materials/material.module';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { ValidatorsModule } from 'src/app/shared/validators/validators.module';

@NgModule({
  declarations: [
    TransferComponent,
    ContactsComponent,
    ContactsListComponent,
    ContactFormComponent,
    DialogContactsDialog,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    TransferRoutingModule,
    MaterialModule,
    FormsModule,
    ValidatorsModule
  ]
})
export class TransferModule { }
