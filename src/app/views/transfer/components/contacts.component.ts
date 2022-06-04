import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from 'src/app/api/contacts.service';
import { Contact } from 'src/app/models/contact.model';
import { DialogData } from '../transfer.component';

@Component({
  selector: 'ng-contacts',
  template: `
    <ng-container *ngIf="statoForm==='Search'">
      <ng-contacts-list [contacts]="contacts" (confirm)="selContatto($event)" (edit)="modificaContatto($event)" (delete)="eliminaContatto($event)"></ng-contacts-list>
      <button mat-raised-button color="primary" type="button" class="fullWidth mb-2" (click)="nuovoContatto()">Nuovo Contatto</button>
    </ng-container>
    <ng-container *ngIf="statoForm==='Insert'||statoForm==='Edit'">
      <button mat-raised-button color="basic" type="button" class="fullWidth mb-2" (click)="statoForm='Search'">Indietro</button>
      <ng-contact-form [initialContact]="currentContact" (saveContact)="salvaContatto($event)"></ng-contact-form>
    </ng-container>
  `,
  styles: [  ]
})

export class ContactsComponent implements OnInit {
  statoForm:'Insert'|'Edit'|'Search'='Search'
  currentContact:Contact|null=null
  contacts:Contact[]=[]

  constructor(private myDialog: MatDialogRef<DialogData>, private myContactsService:ContactsService) { }

  ngOnInit(): void {
    this.myContactsService.getContacts().subscribe(result => {
      this.contacts = result;
    });
  }
  selContatto(pId:string){
    this.myDialog.close(pId)
  }
  nuovoContatto(){
    this.statoForm='Insert'
    this.currentContact=null
  }
  modificaContatto(pId:string){
    const i= this.contacts.findIndex(c=>c._id==pId)
    this.currentContact=this.contacts[i]
    this.statoForm='Edit'
  }
  eliminaContatto(pId:string){
    const i= this.contacts.findIndex(c=>c._id==pId)
    ////this.contacts.splice(i,1)
    //this.contacts=this.contacts.filter(c=>c._id!==pId)
    this.myContactsService.removeContact(this.contacts[i]._id).subscribe(result => {
      if (result){
        this.contacts=this.contacts.filter(c=>c._id!==pId)
      }
    });
  }
  salvaContatto(pContact:Contact){
    const i= this.contacts.findIndex(c=>c._id==pContact._id)
    if (i>=0){
      ////this.contacts[i]=pContact
      //this.contacts=this.contacts.map(c=>{
      //  if (c._id===pContact._id){
      //    return pContact
      //  }else{
      //    return c
      //  }
      //})
      this.myContactsService.updateContact(pContact).subscribe(result => {
        this.contacts=this.contacts.map(c=>{
          if (c._id===pContact._id){
            return result
          }else{
            return c
          }
        })
      });
    }else{
      ////this.contacts.push(pContact)
      //this.contacts=[...this.contacts, pContact]
      this.myContactsService.addContact(pContact).subscribe(result => {
        this.contacts=[...this.contacts, result]
      });
    }
    this.statoForm='Search'
  }

}
