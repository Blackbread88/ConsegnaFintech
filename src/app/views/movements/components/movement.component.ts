import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ng-movement',
  template: `
    <mat-accordion>
      <mat-expansion-panel (opened)="panelOpenState = true"
                          (closed)="panelOpenState = false">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <span class="fst-italic">[{{dataMovimento}}]</span><span class="fw-bold ms-2" [ngClass]="tipo==='in'? 'green':'red'">€ {{importo}}</span><span class="ms-2">{{titolo}}</span>
          </mat-panel-title>
          <mat-panel-description>
            {{(!panelOpenState ? descrizione : '') | Truncate}}
          </mat-panel-description>
        </mat-expansion-panel-header>
        <p>{{descrizione}}</p>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styles: [`
    .green{ color:#51b815;}
    .red{ color:#a30003;}
  `
  ]
})
export class MovementComponent implements OnInit {
  @Input() dataMovimento: string|null="";
  @Input() importo: number=0;
  @Input() tipo:  'in' | 'out'='out';
  @Input() titolo: string="";
  @Input() descrizione: string="";
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
