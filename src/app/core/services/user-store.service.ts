import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, take } from "rxjs";
import { User } from "src/app/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserStore {
  private myUser$ = new BehaviorSubject<User | null>(null);
  user$=this.myUser$.asObservable()

  constructor() {}

  setUser(user:User) {
    this.myUser$.next(user);
  }
  removeUser(){
    this.myUser$.next(null);
  }
}
