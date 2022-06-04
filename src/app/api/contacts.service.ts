import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Contact } from "../models/contact.model";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.apiUrl + '/contacts');
  }
  addContact(newContact:Partial<Contact>): Observable<Contact>{
    return this.http.post<Contact>(environment.apiUrl+'/contacts', newContact);
  }
  updateContact(contactToUpdate:Partial<Contact>): Observable<Contact>{
    return this.http.put<Contact>(environment.apiUrl+'/contacts/'+contactToUpdate._id, contactToUpdate);
  }
  removeContact(idToRemove:string): Observable<boolean>{
    return this.http.delete<boolean>(environment.apiUrl+'/contacts/'+idToRemove);
  }
}
