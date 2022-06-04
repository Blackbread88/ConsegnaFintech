import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'ng-contacts-list',
  template: `
    <mat-form-field appearance="outline">
      <mat-label>Cerca</mat-label>
      <input matInput  type="text" [(ngModel)]="TestoRic" name="cerca">
      <button *ngIf="TestoRic" matSuffix mat-icon-button aria-label="Clear" (click)="TestoRic=''">
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
    <mat-list>
      <div mat-subheader>Contatti</div>
      <mat-list-item *ngFor="let c of contacts | filter:TestoRic">
        <mat-icon mat-list-icon>account_circle</mat-icon>
        <div mat-line>{{c.name}} {{c.surname}}</div>
        <div mat-line>{{c.iban}}</div>
        <mat-icon
          matTooltip="Seleziona"
          matTooltipPosition="below"
          matTooltipShowDelay="500"
          matTooltipHideDelay="500"
          (click)="confirm.emit(c._id)"
        >
          check
        </mat-icon>
        <mat-icon
          matTooltip="Modifica"
          matTooltipPosition="below"
          matTooltipShowDelay="500"
          matTooltipHideDelay="500"
          (click)="edit.emit(c._id)"
        >
          edit
        </mat-icon>
        <mat-icon
          matTooltip="Rimuovi"
          matTooltipPosition="below"
          matTooltipShowDelay="500"
          matTooltipHideDelay="500"
          (click)="delete.emit(c._id)"
        >
          delete
        </mat-icon>
      </mat-list-item>
    </mat-list>
  `,
  styles: [`
    mat-form-field{
      display:block;
    }
   `]
})
export class ContactsListComponent implements OnInit {
  @Input() contacts!: Contact[];
  @Output() confirm = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  TestoRic:string="";
  constructor() { }

  ngOnInit(): void {
  }

}
