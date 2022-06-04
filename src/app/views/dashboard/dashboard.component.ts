import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-dashboard',
  template: `

    <ng-navigation></ng-navigation>
  `,
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
