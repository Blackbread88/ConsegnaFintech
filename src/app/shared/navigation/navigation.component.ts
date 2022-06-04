import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserStore } from 'src/app/core/services/user-store.service';

@Component({
  selector: 'ng-navigation',
  template: `
    <mat-sidenav-container class="home-container">
      <mat-sidenav mode="side" opened>
        <mat-toolbar>
          <span>Menù</span>
        </mat-toolbar>
        <mat-selection-list #sediRef [multiple]="false">
          <mat-list-option value="home" routerLink="home">
            <mat-icon mat-list-icon>home</mat-icon>
            <div mat-line>Home</div>
          </mat-list-option>
          <mat-list-option value="cards" routerLinkActive="menuCorrente" routerLink="./cards">
            <mat-icon mat-list-icon>credit_card</mat-icon>
            <div mat-line>Carte</div>
          </mat-list-option>
          <mat-list-option value="movements" routerLinkActive="menuCorrente" routerLink="./movements">
            <mat-icon mat-list-icon>receipt_long</mat-icon>
            <div mat-line>Movimenti</div>
          </mat-list-option>
          <mat-list-option value="transfer" routerLinkActive="menuCorrente" routerLink="./transfer">
            <mat-icon mat-list-icon>paid</mat-icon>
            <div mat-line>Trasferisci</div>
          </mat-list-option>
          <mat-list-option value="appointments" routerLinkActive="menuCorrente" routerLink="./appointments">
            <mat-icon mat-list-icon>event</mat-icon>
            <div mat-line>Appuntamenti</div>
          </mat-list-option>
          <mat-list-option value="taxes" routerLinkActive="menuCorrente" routerLink="./taxes">
            <mat-icon mat-list-icon>summarize</mat-icon>
            <div mat-line>Tasse</div>
          </mat-list-option>
          <mat-list-option value="User" (click)="LogOut()">
            <mat-icon mat-list-icon>person</mat-icon>
            <div mat-line>{{(myUserStoreService.user$|async)?.displayName}}</div>
            <div mat-line>log out</div>
          </mat-list-option>
        </mat-selection-list>

      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>NgFintech</span>
        </mat-toolbar>

        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
  .home-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .menuCorrente {
    background-color: rgba(0,0,0,0.1);
  }
  `
  ]
})
export class NavigationComponent implements OnInit {

  constructor(private myAuthService:AuthService, public myUserStoreService:UserStore) { }

  ngOnInit(): void {
  }

  LogOut(){
    this.myAuthService.logout()
  }
}
