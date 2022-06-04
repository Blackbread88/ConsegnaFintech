import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent, map, Observable, startWith, tap } from 'rxjs';
import { TaxesService } from 'src/app/api/taxes.service';
import { Taxes } from 'src/app/models/taxes.model';
import { amountValidator } from 'src/app/shared/validators/amount.validators';
import { CodiceFiscaleValidator } from 'src/app/shared/validators/codice-fiscale.validator';
import { INPSErrorStateMatcher } from './utility/utility';

@Component({
  selector: 'ng-taxes',
  template: `
  <mat-card>
    <form [formGroup]="frmTaxes">
      <h1>Contribuente</h1>
      <div formGroupName="contribuente">
        Errori: {{frmTaxes.errors|json}} Valid: {{frmTaxes.valid}}
        Pristine: {{frmTaxes.pristine}} Untouched: {{frmTaxes.untouched}}
        <mat-form-field appearance="outline">
        <mat-label>Codice Fiscale</mat-label>
          <input matInput placeholder="Codice Fiscale" type="input" formControlName="codFiscale">
          <mat-error *ngIf="Contribuente.get('codFiscale')?.errors?.['required']">Codice Fiscale Obbligatorio</mat-error>
          <mat-error *ngIf="Contribuente.get('codFiscale')?.errors?.['InvalidCodFiscale'] && !Contribuente.get('codFiscale')?.errors?.['required']">Codice Fiscale Non Valido</mat-error>
        </mat-form-field>
        Errori: {{Contribuente.get('codFiscale')?.errors|json}} Valid: {{Contribuente.get('codFiscale')?.valid}}
        Pristine: {{Contribuente.get('codFiscale')?.pristine}} Untouched: {{Contribuente.get('codFiscale')?.untouched}}
        <mat-form-field appearance="outline">
        <mat-label>Cognome</mat-label>
          <input matInput placeholder="Cognome" type="input" formControlName="cognome">
          <mat-error>Cognome Obbligatorio</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
        <mat-label>Nome</mat-label>
          <input matInput placeholder="Nome" type="input" formControlName="nome">
          <mat-error>Nome Obbligatorio</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Data di Nascita</mat-label>
          <input matInput [matDatepickerFilter]="calendarFilter" [matDatepicker]="pickerRef" formControlName="dataNascita">
          <mat-datepicker-toggle matSuffix [for]="pickerRef"></mat-datepicker-toggle>
          <mat-datepicker #pickerRef></mat-datepicker>
          <mat-error>Data di Nascita Obbligatoria</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Sesso</mat-label>
          <mat-select formControlName="sesso">
            <mat-option value="M">Maschio</mat-option>
            <mat-option value="F">Femmina</mat-option>
          </mat-select>
          <mat-error>Sesso Obbligatorio</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
        <mat-label>Provincia di Nascita</mat-label>
          <input matInput placeholder="Provincia di Nascita" type="input" formControlName="provNascita">
          <mat-error>Provincia di Nascita Obbligatoria</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
        <mat-label>Comune di Nascita</mat-label>
          <input matInput placeholder="Comune di Nascita" type="input" formControlName="comNascita">
          <mat-error>Comune di Nascita Obbligatorio</mat-error>
        </mat-form-field>
      </div>

      <h1>Erario</h1>
      <ng-container formArrayName="erario">
        <table>
          <tr *ngFor="let er of Erario.controls; let i = index;">
            <div [formGroupName]="i">
              <td>
                <mat-form-field appearance="outline">
                  <mat-label>Codice Tributo</mat-label>
                  <input matInput placeholder="Codice Tributo" type="input" formControlName="codiceTributo">
                  <mat-error>Codice Tributo Obbligatorio</mat-error>
                </mat-form-field>
              </td>
              <td>
                <mat-form-field appearance="outline">
                  <mat-label>Anno Riferimento</mat-label>
                  <input matInput placeholder="Anno Riferimento" type="input" formControlName="anno">
                  <mat-error>Anno Obbligatorio</mat-error>
                </mat-form-field>
              </td>
              <td>
                <mat-form-field appearance="outline">
                  <mat-label>Importo a Debito</mat-label>
                  <input matInput placeholder="Importo a Debito" type="input" formControlName="debito">
                  <mat-error>Importo a Debito Obbligatorio</mat-error>
                </mat-form-field>
              </td>
              <td>
                <mat-form-field appearance="outline">
                  <mat-label>Importo a Credito</mat-label>
                  <input matInput placeholder="Importo a Credito" type="input" formControlName="credito">
                  <mat-error>Importo Credito Obbligatorio</mat-error>
                </mat-form-field>
              </td>
              <td>
                <button mat-mini-fab color="warn" type="button" (click)="removeErario(i)">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </div>
          </tr>
        </table>
      </ng-container>
      Totele: {{ TotErario$ | async }}
      <button mat-mini-fab color="primary" type="button" (click)="addErario()">
        <mat-icon>add</mat-icon>
      </button>

      <h1>Inps</h1>
      <ng-container formArrayName="inps">
        <table>
          <tr *ngFor="let inp of Inps.controls; let i = index;">
            <div [formGroupName]="i">
              <td>
                <mat-form-field appearance="outline">
                  <mat-label>Codice Sede</mat-label>
                  <input matInput placeholder="Codice Sede" type="input" formControlName="codiceSede">
                  <mat-error>Inserire un indirizzo e-mail valido</mat-error>
                </mat-form-field>
              </td>
              <td>
                <mat-form-field appearance="outline">
                  <mat-label>Causale Controibuto</mat-label>
                  <input matInput placeholder="Causale Contributo" type="input" formControlName="causaleContributo">
                  <mat-error>Inserire un indirizzo e-mail valido</mat-error>
                </mat-form-field>
              </td>
              <td>
                <mat-form-field appearance="outline">
                  <mat-label>Codice Inps</mat-label>
                  <input matInput placeholder="Codice Inps" type="input" formControlName="codiceInps">
                  <mat-error>Inserire un indirizzo e-mail valido</mat-error>
                </mat-form-field>
              </td>
              <td>
              <mat-form-field appearance="outline">
                <mat-label>Da</mat-label>
                <input matInput [matDatepickerFilter]="calendarFilter" [matDatepicker]="pickerDaRef" formControlName="da" [errorStateMatcher]="inpsMatcher">
                <mat-datepicker-toggle matSuffix [for]="pickerDaRef"></mat-datepicker-toggle>
                <mat-datepicker #pickerDaRef></mat-datepicker>
              </mat-form-field>
              {{Inps.controls[i].errors|json}}
              </td>
              <td>
              <mat-form-field appearance="outline">
                <mat-label>a</mat-label>
                <input matInput [matDatepickerFilter]="calendarFilter" [matDatepicker]="pickerARef" formControlName="a" [errorStateMatcher]="inpsMatcher">
                <mat-datepicker-toggle matSuffix [for]="pickerARef"></mat-datepicker-toggle>
                <mat-datepicker #pickerARef></mat-datepicker>
              </mat-form-field>
              </td>
              <td>
                <mat-form-field appearance="outline">
                  <mat-label>Debito</mat-label>
                  <input matInput placeholder="Debito" type="input" formControlName="debito">
                  <mat-error>Inserire un indirizzo e-mail valido</mat-error>
                </mat-form-field>
              </td>
              <td>
                <mat-form-field appearance="outline">
                  <mat-label>Credito</mat-label>
                  <input matInput placeholder="Credito" type="input" formControlName="credito">
                  <mat-error>Inserire un indirizzo e-mail valido</mat-error>
                </mat-form-field>
              </td>
              <td>
                <button mat-mini-fab color="warn" type="button" (click)="removeInps(i)">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </div>
          </tr>
        </table>
      </ng-container>

      <button mat-mini-fab color="primary" type="button" (click)="addInps()">
        <mat-icon>add</mat-icon>
      </button>

      <button mat-raised-button color="primary" [disabled]="!frmTaxes.valid" (click)="ConfermaF24()" class="fullWidth mb-4">Invia</button>
      <button mat-raised-button color="primary" (click)="ConfermaF24()" class="fullWidth mb-2">Invia</button>
    </form>
</mat-card>
  `,
  styles: [`
    mat-form-field{
      display:block;
    }
    .buttonIco {
      display: flex;
      justify-content: center;
      width: 120px;
    }
  `]
})
export class TaxesComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  inpsMatcher = new INPSErrorStateMatcher();
  initialValue={
    contribuente: {
      codFiscale:'',
      cognome:'',
      nome:'',
      dataNascita:'',
      sesso:'',
      provNascita:'',
      comNascita:''
    },
    erario: [],
    inps: []
  }

  frmTaxes=this.fb.group({
    contribuente: this.fb.group({
      codFiscale:['', [Validators.required, CodiceFiscaleValidator]],
      cognome:['', Validators.required],
      nome:['', Validators.required],
      dataNascita:['', Validators.required],
      sesso:['', Validators.required],
      provNascita:['', Validators.required],
      comNascita:['', Validators.required]
    }),
    erario: this.fb.array([]),
    inps: this.fb.array([])
  })
  TotErario$!: Observable<number>;
  TotInps$!: Observable<number>;
  Totale$!: Observable<number>;

  calendarFilter =(date: Date | null): boolean => {
    const day = (date || new Date());
    const oggi = new Date();
    return day.getTime()<=oggi.getTime();
  }

  constructor(private fb:FormBuilder, private myTaxesService:TaxesService, private mySnackBar: MatSnackBar) { }
  ngOnInit() {
    this.TotErario$ = this.frmTaxes.valueChanges.pipe(
      tap(val=>{
        console.log(val as unknown as Taxes)
      }),
      map((val:Taxes)=>{

        return val.erario.reduce((Tot,Er)=>Tot + +Er.credito,0)
      },
      startWith(0)
      )
    )
    this.TotInps$ = this.frmTaxes.valueChanges
  }

  get Contribuente(){
    return this.frmTaxes.controls['contribuente']
  }
  get Erario(){
    return this.frmTaxes.controls['erario'] as FormArray
  }
  get Inps(){
    return this.frmTaxes.controls['inps'] as FormArray
  }

  addErario() {
    const ErarioGroup = this.fb.group({
      codiceTributo: ['', Validators.required],
      anno: ['', Validators.required],
      debito: ['', [Validators.required, amountValidator()]],
      credito: ['', [Validators.required, amountValidator()]]
    });
    this.Erario.push(ErarioGroup)
    ;

  }
  removeErario(index: number) {
    this.Erario.removeAt(index);
  }

  addInps() {
    const InpsGroup = this.fb.group({
      codiceSede: ['', Validators.required],
      causaleContributo: ['', Validators.required],
      codiceInps:['', Validators.required],
      da: ['', Validators.required],
      a: ['', Validators.required],
      debito: ['', [Validators.required, amountValidator()]],
      credito: ['', [Validators.required, amountValidator()]]
    });
    InpsGroup.addValidators([inpsValidator]);
    this.Inps.push(InpsGroup);
    this.frmTaxes.updateValueAndValidity()
  }
  removeInps(index: number) {
    this.Inps.removeAt(index);
  }

  ConfermaF24(){
    this.frmTaxes.reset(this.initialValue);
    this.formDirective.resetForm();
    console.log('aaaa')
    //this.frmTaxes.get('contribuente')?.get('codFiscale')?.markAsPristine();
    //this.frmTaxes.get('contribuente')?.get('codFiscale')?.markAsUntouched();
    //this.frmTaxes.updateValueAndValidity();

    //this.frmTaxes.ma
    /*this.myTaxesService.addF24(this.frmTaxes.value).subscribe(result => {
      if (result===true){
        this.mySnackBar.open('Modello F24 Inviato Correttamente', 'chiudi', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.Erario.clear();
        this.Inps.clear();
        this.frmTaxes.reset();
        this.frmTaxes.markAsPristine();
        this.frmTaxes.markAsUntouched();
      }else{
        this.mySnackBar.open('Invio Modello F24 non riuscito', 'chiudi', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    });*/
  }
}

export const inpsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (control.value){
    if (control.get('da')?.value && control.get('a')?.value){
      const data1 = new Date(control.get('da')?.value);
      const data2 = new Date(control.get('a')?.value);
      if (data1.getTime()>data2.getTime()){
        //return {InvalidDateRange: 'Range di date non valido'}
        return {inps: 'La data di inizio deve essere precedente alla data di fine'}

      }
    }
  }
  return null
};
