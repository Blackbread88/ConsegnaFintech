import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CardsService } from 'src/app/api/cards.service';
import { CardForm } from 'src/app/models/card-form.model';
import { Card} from 'src/app/models/card.model';
import { CardFormComponent } from './components/card-form.component';

@Component({
  selector: 'ng-cards',
  template: `
    <mat-drawer-container hasBackdrop="false">
      <mat-drawer-content >
        <ng-card-list [creditCards]="creditCards" (addNewCard)="drawer.open()" (removeCard)="eliminaCarta($event)" (showMovement)="vediMovimenti($event)"></ng-card-list>
      </mat-drawer-content>
      <mat-drawer #drawer mode="side" position="end">
        <ng-card-form #cardForm (NewCard)="aggiungiCarta($event)" (abortOperation)="dispose()"></ng-card-form>
      </mat-drawer>
    </mat-drawer-container>

  `,
  styles: [`
  mat-drawer-container{
    min-height:80vh;
  }
  `
  ]
})
export class CardsComponent implements OnInit {
  @ViewChild('drawer') myDrawer!:MatDrawer;
  @ViewChild('cardForm') myCardForm!:CardFormComponent;
  creditCards:Card[]=[];

  constructor(private mySnackBar: MatSnackBar, private cardService: CardsService, private myRouter:Router) { }

  ngOnInit(): void {
    this.cardService.getCards().subscribe(result => {
      this.creditCards = result;
    });
  }

  eliminaCarta(idCarta:string){
    this.cardService.removeCard(idCarta).subscribe(result => {
      let message='Carta Eliminata';
      if (result){
        this.creditCards=this.creditCards.filter(item => item._id !=idCarta);
      }else{
        message='Impossibile Rimuovere la carta'
      }
      this.mySnackBar.open(message, '', {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 1500
        })
      });
  }

  aggiungiCarta(myNewCard:CardForm){
    this.cardService.addCard(myNewCard).subscribe(result => {
      this.creditCards=[...this.creditCards,result]
      this.dispose()
      this.mySnackBar.open("Carta '"+result.number+"' Aggiunta all'elenco", '', {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 2000
      });
    });
  }

  dispose(){
    this.myCardForm.cleanup();
    this.myDrawer.close();
  }

  vediMovimenti(idCarta:string){
    this.myRouter.navigateByUrl('dashboard/movements/'+idCarta)
  }
}
