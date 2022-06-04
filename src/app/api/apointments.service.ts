import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DayWithSlot } from "../models/day-with-slot.model";
import { DayWithSlots } from "../models/day-with-slots.model";
import { Location } from "../models/location.model";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) {}

  getLocation(): Observable<Location[]>{
    return this.http.get<Location[]>(environment.apiUrl+'/locations');
  }
  getSlot(idLocation:string): Observable<DayWithSlots[]>{
    return this.http.get<DayWithSlots[]>(environment.apiUrl+'/slots/'+idLocation);
  }
  confirmAppointment(Appuntamento:DayWithSlot): Observable<boolean>{
    return this.http.post<boolean>(environment.apiUrl+'/schedule', Appuntamento);
  }
}
