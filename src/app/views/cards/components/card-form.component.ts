import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CardForm } from 'src/app/models/card-form.model';

@Component({
  selector: 'ng-card-form',
  template: `
    <h3 class="fw-bold">Aggiungi Carta</h3>
    <form #f="ngForm" (ngSubmit)="createNewCard(f)">
      <mat-form-field appearance="outline">
        <mat-label>Tipo di carta</mat-label>
        <mat-select required ngModel #tipoCartaRef="ngModel" name="type">
          <mat-option *ngFor="let t of TipiCarte" [value]="t.toLowerCase()">{{t}}</mat-option>
        </mat-select>
        <mat-error *ngIf="tipoCartaRef.errors?.['required'] && (tipoCartaRef.dirty || tipoCartaRef.touched)" class="invalidField">Tipo Carta Obbligatorio</mat-error>
      </mat-form-field>
      <table class="fullWidth">
        <tr>
          <td>
            <mat-form-field appearance="outline">
              <mat-label>Nome</mat-label>
              <input matInput placeholder="Nome" type=""
                required ngModel #nomeRef="ngModel" name="name"
              >
              <mat-error *ngIf="nomeRef.errors?.['required'] && (nomeRef.dirty || nomeRef.touched)" class="invalidField">Nome Obbligatorio</mat-error>
            </mat-form-field>
          </td>
          <td>
            <mat-form-field appearance="outline">
              <mat-label>Cognome</mat-label>
              <input matInput placeholder="Cognome" type=""
                required ngModel #cognomeRef="ngModel" name="surname"
              >
              <mat-error *ngIf="cognomeRef.errors?.['required'] && (cognomeRef.dirty || cognomeRef.touched)" class="invalidField">Cognome Obbligatorio</mat-error>
            </mat-form-field>
          </td>
        </tr>
      </table>
      <mat-form-field appearance="outline">
        <mat-label>Numero Carta</mat-label>
        <input matInput placeholder="Numero Carta" type=""
          required minlength="16" maxlength="16"
          ngModel #numCartaRef="ngModel" name="number"
        >
        <mat-error *ngIf="(numCartaRef.errors?.['required'] || numCartaRef.errors?.['minlength'] || numCartaRef.errors?.['maxlength']) && (numCartaRef.dirty || numCartaRef.touched)" class="invalidField">Il numero di carta deve essere di 16 caratteri</mat-error>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Codice CVV</mat-label>
        <input matInput placeholder="Codice CVV" type=""
          required minlength="3" maxlength="3"
          ngModel #codCVVRef="ngModel" name="csc"
        >
        <mat-error *ngIf="(codCVVRef.errors?.['required']||codCVVRef.errors?.['minlength']||codCVVRef.errors?.['maxlength']) && (codCVVRef.dirty || codCVVRef.touched)" class="invalidField">Il codice di sicurezza deve essere di 3 caratteri</mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="f.invalid" class="fullWidth mb-2">Aggiungi Carta</button>
      <button mat-stroked-button color="warn" type="button" class="fullWidth mb-2" (click)="abortOperation.emit()">Annulla</button>
    </form>
  `,
  styles: [`
    mat-form-field{
      display:block;
    }
    `]
})
export class CardFormComponent implements OnInit {
  @Output() NewCard = new EventEmitter<CardForm>();
  @Output() abortOperation = new EventEmitter();
  @ViewChild('f') frm!: NgForm;
  TipiCarte:string[]=['MasterCard','Visa']
  constructor() {}

  ngOnInit(): void {
  }
  createNewCard(myfrm:NgForm){
    this.NewCard.emit(myfrm.value)
  }
  public cleanup(){
    this.frm.form.reset()
    this.frm.resetForm()
  }
}
