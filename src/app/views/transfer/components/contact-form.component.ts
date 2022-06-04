import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'ng-contact-form',
  template: `
    <form #f="ngForm" (ngSubmit)="Salva(f.value)">
      <mat-form-field appearance="outline">
        <mat-label>Nome</mat-label>
        <input matInput placeholder="Nome" type=""
          required ngModel #nameRef="ngModel" [ngModel]="initialContact?.name" name="name"
        >
        <mat-error *ngIf="nameRef.errors?.['required'] && (nameRef.dirty || nameRef.touched)">Nome Obbligatorio</mat-error>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Cognome</mat-label>
        <input matInput placeholder="Cognome" type=""
          required ngModel #surnameRef="ngModel" [ngModel]="initialContact?.surname" name="surname"
        >
        <mat-error *ngIf="surnameRef.errors?.['required'] && (surnameRef.dirty || surnameRef.touched)">Cognome Obbligatorio</mat-error>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>IBAN</mat-label>
        <input matInput placeholder="IBAN" type=""
          required minlength="27" maxlength="27"
          ngModel #ibanRef="ngModel" [ngModel]="initialContact?.iban" name="iban"
        >
        <mat-error *ngIf="ibanRef.errors?.['required'] && (ibanRef.dirty || ibanRef.touched)">IBAN Obbligatorio</mat-error>
        <mat-error *ngIf="(ibanRef.errors?.['minlength']||ibanRef.errors?.['maxlength']) && (ibanRef.dirty || ibanRef.touched)">IBAN non valido</mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" type=submit [disabled]="f.invalid" class="fullWidth mb-2">Salva</button>
    </form>
  `,
  styles: [`
    mat-form-field{
      display:block;
    }
  `]
})
export class ContactFormComponent implements OnInit {
  @Input() initialContact:Contact|null=null;
  @Output() saveContact = new EventEmitter<Contact>();
  constructor() { }

  ngOnInit(): void {
  }
  Salva(pContatto:Contact){
    if (this.initialContact){
      pContatto._id=this.initialContact?._id
    }
    this.saveContact.emit(pContatto)
  }
}
