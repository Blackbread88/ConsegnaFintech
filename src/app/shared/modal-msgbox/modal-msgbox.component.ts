import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'ng-modal-msgbox',
  template: `
    <h1 mat-dialog-title>{{data.Title}}</h1>
    <div mat-dialog-content>
      <table>
        <tr>
          <td [innerHtml]="data.InnerHtml"></td>
          <td *ngIf="data.Icon">
            <!--<span class="material-icons">{{data.Icon}}</span>-->
          </td>
        </tr>
      </table>
    </div>
    <mat-dialog-actions align="center">
    <button mat-button [mat-dialog-close]="false" *ngIf="data.YesNo">{{data.ButtonAnnullaText? data.ButtonAnnullaText:'Annulla'}}</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>{{data.ButtonOkText? data.ButtonOkText:'Conferma'}}</button>
    </mat-dialog-actions>
  `,
  styles: [``]
})

export class ModalMsgboxComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalMsgboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalMsgboxData,
  ) {}
}

export interface ModalMsgboxData {
  Title:string;
  InnerHtml:string;
  Icon: string|null;
  YesNo:boolean|null;
  ButtonOkText:string|null;
  ButtonAnnullaText:string|null;
}
