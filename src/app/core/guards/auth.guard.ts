import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private myAuthService: AuthService,
    private myRouter: Router
  ) {}

  canActivate(): Observable<boolean> {
    // Controlla se c'è l'utente
    return this.myAuthService.fetchUser().pipe(
      take(1),
      // Se non abbiamo errori ritorniamo true
      mapTo(true),
      // Se abbiamo un errore navighiamo al login e ritorniamo false
      catchError(() => {
        this.myRouter.navigateByUrl('/login');
        return of(false);
      })
    );
  }
  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
