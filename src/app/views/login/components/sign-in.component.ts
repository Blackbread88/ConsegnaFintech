import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'ng-sign-in',
  template: `
    <form #f="ngForm" (ngSubmit)="LogIn(f)" style="display:block">
        <mat-form-field appearance="outline">
          <mat-icon matPrefix color="primary">person</mat-icon>
          <mat-label>E-Mail</mat-label>
          <input matInput placeholder="E-Mail" type="email"
            required pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
            ngModel #emailRef="ngModel" name="email"
          >
          <mat-error *ngIf="emailRef.errors?.['required'] && (emailRef.dirty || emailRef.touched)">Inserire indirizzo e-mail</mat-error>
          <mat-error *ngIf="emailRef.errors?.['pattern'] && (emailRef.dirty || emailRef.touched)">Inserire un indirizzo e-mail valido</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-icon matPrefix color="primary">lock</mat-icon>
          <mat-label>Password</mat-label>
          <input matInput placeholder="Password" [type]="!pswVisibile? 'password' : ''"
            required
            ngModel #passwordRef="ngModel" name="password"
          >
          <mat-icon matSuffix *ngIf="pswVisibile" (click)="MostraNascondiPsw()">visibility</mat-icon>
          <mat-icon matSuffix *ngIf="!pswVisibile" (click)="MostraNascondiPsw()">visibility_off</mat-icon>
          <mat-error *ngIf="passwordRef.errors?.['required'] && (passwordRef.dirty || passwordRef.touched)">Inserire la password</mat-error>
        </mat-form-field>
        <button mat-raised-button color="primary" tipe=submit [disabled]="f.invalid" class="button100 mb-2">Accedi</button>
        <mat-error *ngIf="ErroreLogin">Nome Utente o Password Errati</mat-error>
    </form>
  `,
  styles: [`
    mat-form-field{
      display:block;
    }
  `
  ]
})
export class SignInComponent implements OnInit {
  ErroreLogin:boolean=false
  pswVisibile:boolean=false;
  constructor(private myAuthService:AuthService, private myRouter:Router) { }

  ngOnInit(): void {
  }

  LogIn(frm:NgForm){
    this.ErroreLogin=false
    this.myAuthService.login(frm.value.email,frm.value.password)
    .subscribe(esito=>{
      if (esito){
        this.myRouter.navigateByUrl('/dashboard')
      }else{
        this.ErroreLogin=true
      }
    })
  }

  MostraNascondiPsw(){
    this.pswVisibile=!this.pswVisibile
  }
}
