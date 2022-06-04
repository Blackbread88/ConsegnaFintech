import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-home',
  template: `
    <div class='text-center p-4'>
      <h1>Benvenuto in FINTECH</h1>
      <br><br>
      <h2>La tua banca a portata di click!</h2>
    </div>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
