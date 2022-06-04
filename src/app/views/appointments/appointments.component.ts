import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subscription, switchMap } from 'rxjs';
import { AppointmentService } from 'src/app/api/apointments.service';
import { DayWithSlot } from 'src/app/models/day-with-slot.model';
import { DayWithSlots } from 'src/app/models/day-with-slots.model';
import { Location } from 'src/app/models/location.model';
import { ModalMsgboxComponent } from 'src/app/shared/modal-msgbox/modal-msgbox.component';
@Component({
  selector: 'ng-appointments',
  template: `
    <mat-drawer-container hasBackdrop="false">
      <mat-drawer-content>
       <mat-selection-list #sediRef [multiple]="false">
          <div mat-subheader>Sedi</div>
          <mat-list-option *ngFor="let l of locations" [value]="l._id" (click)="caricaDatiSede(l,drawer)">
            <mat-icon mat-list-icon>business</mat-icon>
            <div mat-line>{{l.name}}</div>
            <div mat-line>{{l.address}}</div>
          </mat-list-option>
        </mat-selection-list>
      </mat-drawer-content>

      <mat-drawer #drawer mode="side" position="end">
        <ng-map [coords]="selectedLocation?.coords" [zoom]="20"></ng-map>
        <mat-form-field appearance="fill">
          <mat-label>Scegli una data</mat-label>
          <input matInput [matDatepickerFilter]="calendarFilter" [matDatepicker]="pickerRef" #txtData (dateChange)="dataSelezionata('change', $event)">
          <mat-datepicker-toggle matSuffix [for]="pickerRef"></mat-datepicker-toggle>
          <mat-datepicker #pickerRef></mat-datepicker>
        </mat-form-field>
        <mat-selection-list #orarioRef [multiple]="false">
          <div mat-subheader>Orari Disponibili</div>
          <mat-list-option *ngFor="let slot of selectedDay?.slots; let i=index;" [value]="i" (click)="confermaAppuntamento(i)">
            <mat-icon mat-list-icon>schedule</mat-icon>
            <div mat-line>{{slot|number:'2.0'}}</div>
          </mat-list-option>
        </mat-selection-list>

      </mat-drawer>
    </mat-drawer-container>
  `,
  styles: [`
    mat-drawer{
      width:40%;
    }
    mat-form-field{
      display:block;
    }
    mat-drawer-container{
      height: 100%;
    }
  `]
})
export class AppointmentsComponent implements OnInit {
  @ViewChild('txtData')txtData!:ElementRef<HTMLInputElement>
  Appuntamento:DayWithSlot={day:'',slot:1}
  selectedLocation:Location|null=null
  selectedDay:DayWithSlots|undefined=undefined
  selectedSlotIndex:number=0
  disponibility:DayWithSlots[]|null=null
  locations:Location[]=[]
  //sub=new Subscription
  calendarFilter =(date: Date | null): boolean => {
    const day = (date || new Date());
    if (!this.disponibility){return false}

    const dayTrovato=this.findDate(day)
    return dayTrovato?true:false;
  }
  constructor(private myDialog: MatDialog, private mySnackBar: MatSnackBar, private myAppointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.myAppointmentService.getLocation().subscribe(result => {
      this.locations = result;
    });
  }

  caricaDatiSede(pSedeSel:Location,pDrawer: MatDrawer){
    this.selectedLocation=pSedeSel
    this.myAppointmentService.getSlot(this.selectedLocation._id).subscribe(result => {
      this.disponibility = result;
      pDrawer.open()
      this.txtData.nativeElement.value='';
      this.selectedDay=undefined;
    });
  }
  findDate(dateToFind:Date):DayWithSlots|undefined{
    if (!this.disponibility){return undefined}
    return this.disponibility.find(
      d => {
        //const data:Date=new Date(d.day)
        const data:Date=this.stringToDate(d.day)
        return data.getTime() === dateToFind.getTime()
      }
    );
  }
  dataSelezionata(type: string, event: MatDatepickerInputEvent<Date>){
    if (event.value){
      const data=new Date(event.value)
      this.selectedDay=this.findDate(data)
    }else{this.selectedDay=undefined}
  }
  confermaAppuntamento(pIndex:number){
    const dialogRef = this.myDialog.open(ModalMsgboxComponent, {
      data: {
        Title:"Confermi l'Appuntamento?",
        InnerHtml:"<p>L'appuntamento sarà fissato per il giorno "+ this.selectedDay?.day+" alle ore "+this.selectedDay?.slots[pIndex]+".</p>",
        Icon: "question_mark",
        YesNo:true
      },
    });

    /*dialogRef.afterClosed().subscribe(result => {
      if (result===true && this.selectedDay){
        this.Appuntamento.day=this.selectedDay.day
        this.Appuntamento.slot=this.selectedDay.slots[0]
        console.log(this.Appuntamento)
        this.mySnackBar.open('Appuntamento Confermato', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    });*/

    dialogRef.afterClosed().pipe(
      switchMap(esito=>{
        if (esito && this.selectedDay){
          this.Appuntamento.day=this.selectedDay.day
          this.Appuntamento.slot=this.selectedDay.slots[0]
          return this.myAppointmentService.confirmAppointment(this.Appuntamento)
        } else{
          return new BehaviorSubject<boolean>(false)
        }
      })
    ).subscribe(result => {
      if (result===true){
        this.mySnackBar.open('Appuntamento Confermato', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    });

  }
  dateToString(d: Date|undefined) {
    if (d===undefined){return ''}
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [month, day, year].join('/');
  }
  stringToDate(s:string):Date{
    const dataArray = s.split("/")
    return new Date([dataArray[1],dataArray[0],dataArray[2]].join('/'))
  }
}
