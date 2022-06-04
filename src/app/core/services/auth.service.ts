import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, mapTo, observable, Observable, of, switchMap, take, tap } from "rxjs";
import { Credentials } from "src/app/models/credentials.model";
import { User } from "src/app/models/user.model";
import { environment } from "src/environments/environment";
import { UserStore } from "./user-store.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private myHttp:HttpClient,private myRouter:Router, private myUserStore:UserStore) {
    this.myHttp.get<void>(environment.apiUrl +'/csrf-token').subscribe();
  }

  register(credentials: Credentials): Observable<boolean>{
    return this.myHttp.post<boolean>(environment.apiUrl+'/register', credentials);
  }

  logout(): void {
    this.myHttp.get(environment.apiUrl + '/logout').subscribe(()=>{
      this.myUserStore.removeUser();
      this.myRouter.navigateByUrl('/login');
    });

  }

  fetchUser(forceReload = false): Observable<User> {
    return this.myUserStore.user$.pipe(
      take(1),
      switchMap(user => {
        return (!!user && !forceReload)
          ? of(user)
          : this.myHttp.get<any>(environment.apiUrl+'/me', {}).pipe(
            tap(u => {
              return this.myUserStore.setUser(u)})
          );
      })
    );
  }

  /*login(email: string, password: string): Observable<boolean>{
    return this.myHttp.post<boolean>(environment.apiUrl+'/login', {email:email,password:password}).pipe(
      switchMap(() =>{
        console.log('primo switchmap')
        return this.fetchUser(true).pipe(
          tap(a=> console.log('prova login',a)),
          mapTo(true)
        )
      }),
      catchError(error=> of (false))
    )
  }*/

  login(email: string, password: string): Observable<boolean>{
    console.log(environment.apiUrl+'/login')
    return this.myHttp.post<boolean>(environment.apiUrl+'/login', {email:email,password:password}).pipe(
      switchMap((x) => this.fetchUser(true)),
      tap(console.log),
      mapTo(true),
      catchError(err=> of (false))
    )
  }
}

