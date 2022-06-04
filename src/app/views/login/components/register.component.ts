import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, mapTo, of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { PasswordErrorStateMatcher } from './utility/utility';
@Component({
  selector: 'ng-register',
  template: `
    <form #f="ngForm" equalField fldName1="password" fldName2="password2" (ngSubmit)="RegisterUser(f)">
        <mat-form-field appearance="outline">
          <mat-label>E-Mail</mat-label>
          <input matInput placeholder="E-Mail" type="email"
            required pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
            ngModel #emailRef="ngModel" name="email"
          >
          <mat-error *ngIf="emailRef.errors?.['required'] && (emailRef.dirty || emailRef.touched)">E-Mail Obbligatoria</mat-error>
          <mat-error *ngIf="emailRef.errors?.['pattern'] && (emailRef.dirty || emailRef.touched)">Inserire un indirizzo e-mail valido</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Nome</mat-label>
          <input matInput placeholder="Nome" type=""
            required minlength="2"
            ngModel #nameRef="ngModel" name="name"
          >
          <mat-error *ngIf="nameRef.errors?.['required'] && (nameRef.dirty || nameRef.touched)">Nome Obbligatorio</mat-error>
          <mat-error *ngIf="nameRef.errors?.['minlength'] && (nameRef.dirty || nameRef.touched)">Il nome deve essere almeno di {{nameRef.errors?.['minlength']}} caratteri</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Cognome</mat-label>
          <input matInput placeholder="Cognome" type=""
            required minlength="2"
            ngModel #surnameRef="ngModel" name="surname"
          >
          <mat-error *ngIf="surnameRef.errors?.['required'] && (surnameRef.dirty || surnameRef.touched)">Cognome Obbligatorio</mat-error>
          <mat-error *ngIf="surnameRef.errors?.['minlength'] && (surnameRef.dirty || surnameRef.touched)">Il cognome deve essere almeno di {{surnameRef.errors?.['minlength'].requiredLength}} caratteri</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <input matInput placeholder="Password" [type]="!pswVisibile1? 'password' : ''"
            required
            ngModel #passwordRef="ngModel" name="password"
          >
          <mat-icon matSuffix *ngIf="pswVisibile1" (click)="MostraNascondiPsw(1)">visibility</mat-icon>
          <mat-icon matSuffix *ngIf="!pswVisibile1" (click)="MostraNascondiPsw(1)">visibility_off</mat-icon>
          <mat-error *ngIf="passwordRef.errors?.['required'] && (passwordRef.dirty || passwordRef.touched)">Inserire la password</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <input matInput placeholder="Ripeti Password" [type]="!pswVisibile2? 'password' : ''"
            required
            ngModel #psw2Ref #password2Ref="ngModel" name="password2" [errorStateMatcher]="pswMatcher"
          >
          <mat-icon  matSuffix *ngIf="pswVisibile2" (click)="MostraNascondiPsw(2)">visibility</mat-icon>
          <mat-icon matSuffix *ngIf="!pswVisibile2" (click)="MostraNascondiPsw(2)">visibility_off</mat-icon>
          <mat-error *ngIf="password2Ref.errors?.['required'] && (password2Ref.dirty || password2Ref.touched)">Inserire la password</mat-error>
          <mat-error *ngIf="f.errors?.['repeatPassword'] && !password2Ref.errors?.['required'] && (password2Ref.dirty || password2Ref.touched)">le 2 password devono coincidere</mat-error>
        </mat-form-field>

        <mat-error *ngIf="ErroreRegistrazione">{{ErroreRegistrazione}}</mat-error>
        <button mat-raised-button color="primary" type=submit [disabled]="f.invalid" class="fullWidth mb-2">Registrati</button>
    </form>
  `,
  styles: [`
    mat-form-field{
      display:block;
    }
  `
  ]
})
export class RegisterComponent implements OnInit {
  pswMatcher = new PasswordErrorStateMatcher();
  @ViewChild('psw2Ref') Psw2!:ElementRef<HTMLInputElement>;
  pswVisibile1:boolean=false;
  pswVisibile2:boolean=false;
  ErroreRegistrazione:string="";
  constructor(private myAuthService:AuthService, private mySnackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  RegisterUser(frm:NgForm){
    this.myAuthService.register(frm.value).pipe(
      mapTo(true),//Rimappo a true se tutto va bene, perchè dovrebbe restituire un boolean ma in realtà mi arriva message:'.....'
      catchError(err=>{
        return of(err.error)})
    )
    .subscribe(esito=>{
      console.log('Registrazione Utente',esito)
      if (esito===true){
        this.mySnackBar.open("Utente Registrato Correttamente!", '', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 2000
        });
        frm.resetForm()
      } else {
        this.ErroreRegistrazione=esito.error
      }
    })
  }

  MostraNascondiPsw(ind:number){
    if (ind==2){
      this.pswVisibile2=!this.pswVisibile2;
    }else{
      this.pswVisibile1=!this.pswVisibile1;
    }
  }
}
