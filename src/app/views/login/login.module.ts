import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './components/register.component';
import { SignInComponent } from './components/sign-in.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/materials/material.module';
import { ValidatorsModule } from 'src/app/shared/validators/validators.module';


@NgModule({
  declarations: [
    LoginComponent,
    SignInComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FormsModule,
    ValidatorsModule
  ]
})
export class LoginModule { }
