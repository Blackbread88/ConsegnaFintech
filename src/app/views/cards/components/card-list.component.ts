import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'ng-card-list',
  template: `
    <mat-list>
      <div mat-subheader>Carte</div>
      <mat-list-item *ngFor="let card of creditCards">
        <mat-icon mat-list-icon>credit_card</mat-icon>
        <div mat-line>{{card.number}}</div>
        <div mat-line>€ {{card.amount }} - {{card.type}}</div>
        <mat-icon
          matTooltip="Vedi Movimenti"
          matTooltipPosition="above"
          matTooltipShowDelay="500"
          matTooltipHideDelay="500"
          (click)="showMovement.emit(card._id)"
        >receipt_long
        </mat-icon>
        <mat-icon
          matTooltip="Rimuovi Carta"
          matTooltipPosition="above"
          matTooltipShowDelay="500"
          matTooltipHideDelay="500"
          (click)="removeCard.emit(card._id)"
        >
          delete_forever
        </mat-icon>
      </mat-list-item>
      <div mat-subheader *ngIf="creditCards.length<=0" color="error">Nessuna carta di credito inserita</div>
    </mat-list>
    <button mat-raised-button color="primary" class="fullWidth" (click)="addNewCard.emit()">Aggiungi</button>
  `,
  styles: [``]
})
export class CardListComponent implements OnInit {
  @Output() addNewCard = new EventEmitter();
  @Output() removeCard = new EventEmitter<string>();
  @Output() showMovement = new EventEmitter<string>();
  @Input() creditCards: Card[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
