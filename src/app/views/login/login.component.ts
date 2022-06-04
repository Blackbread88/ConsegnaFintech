import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-login',
  template: `
    <div class="row pt-5">
      <div class="col"></div>
      <div class="col col-sm-12 col-md-6">
        <mat-card>
          <router-outlet></router-outlet>
          <button mat-stroked-button color="primary" [routerLink]="GetLink()">{{TestoPulsante}}</button>
        </mat-card>
      </div>
      <div class="col"></div>
    </div>
  `,
  styles: [``]
})
export class LoginComponent implements OnInit {
  TestoPulsante:string=''
  constructor(private myRouter:Router) { }

  ngOnInit(): void {
  }

  GetLink(){
    if (this.myRouter.url.trim()!=='/login/register'){
      this.TestoPulsante='Crea un nuovo account'
      return './register'
    }else{
      this.TestoPulsante='Hai già un account? Accedi'
      return './signin'
    }
  }
}
