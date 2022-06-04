import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CardForm } from "../models/card-form.model";
import { Card } from "../models/card.model";
import { Movement } from "../models/movement.model";

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(environment.apiUrl + '/cards');
  }
  addCard(newCard:CardForm): Observable<Card> {
    return this.http.post<Card>(environment.apiUrl+'/cards', newCard);
  }
  removeCard(idToRemove:string): Observable<boolean>{
    return this.http.delete<boolean>(environment.apiUrl+'/cards/'+idToRemove);
  }
  getMovements(idCard:string,limit:number,offset:number): Observable<MovementsResult> {
    return this.http.get<MovementsResult>(environment.apiUrl + '/cards/'+idCard+'/movements',{
      params: {
        limit: limit,
        offset:offset
      }});
  }
}
export interface MovementsResult{
  data: Movement[],
  total: number
}
