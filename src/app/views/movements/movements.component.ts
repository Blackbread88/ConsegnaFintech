import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { CardsService } from 'src/app/api/cards.service';
import { Card } from 'src/app/models/card.model';
import { Movement } from 'src/app/models/movement.model';

@Component({
  selector: 'ng-movements',
  template: `
    <mat-card>
      <mat-form-field appearance="fill">
        <mat-label>Seleziona Carta di Credito</mat-label>
        <mat-select #cmbCartaRef name="cmbCarta">
          <mat-option *ngFor="let card of creditCards" [value]="card._id" (click)="CaricaMovimenti(card,true)">{{card.number}}</mat-option>
        </mat-select>
      </mat-form-field>
      <h3 class="fw-bold" *ngIf="selectedCard">Saldo:{{selectedCard.amount}} </h3>
      <ng-movement *ngFor="let mov of movimenti" [dataMovimento]="mov.timestamp |date:'dd/MM/yyyy HH:mm'" [importo]="mov.amount" [tipo]="mov.type" [titolo]="mov.title" [descrizione]="mov.description"></ng-movement>
      <button *ngIf="selectedCard && mostraPulsante" mat-stroked-button color="primary" (click)="CaricaMovimenti(selectedCard)" class="fullWidth">Carica Altro</button>
    </mat-card>
  `,
  styles: []
})
export class MovementsComponent implements OnInit {
  @ViewChild('cmbCartaRef') cmbCarta!: MatSelect
  totMovimenti:number=0;
  selectedCard:Card|null=null;
  mostraPulsante:boolean=true;
  creditCards:Card[]=[]
  movimenti:Movement[]=[]

  constructor(private cardsService: CardsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cardsService.getCards().subscribe(result => {
      this.creditCards = result;
      const cardId = this.activatedRoute.snapshot.params['cardId'];
      if (cardId){
        this.cmbCarta.value=cardId
        const c:Card|undefined=this.creditCards.find(card=>card._id===cardId)
        if(c){this.CaricaMovimenti(c,true)}
      }
    });
  }

  CaricaMovimenti(CardSel:Card,primaVolta:boolean|null=null){
    let offset:number=0;
    const limit=5;
    this.selectedCard=CardSel;
    if (primaVolta){
      this.totMovimenti=0;
      offset=0;
      this.movimenti=[]
      this.mostraPulsante=true;
    }else{
      offset=this.movimenti.length+1;
      if (this.movimenti.length<this.totMovimenti){
        this.mostraPulsante=false;
      }
    }
    this.cardsService.getMovements(CardSel._id,limit,offset).subscribe(result=>{
      this.movimenti=this.movimenti.concat(... result.data)
      this.totMovimenti=result.total
    });
  }
}
