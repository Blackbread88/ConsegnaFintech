import { Directive, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  FormControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { CardsService } from 'src/app/api/cards.service';

//Direttiva (Template-Driven Forms), a sua volta usa la funzione precedente
@Directive({
  selector: '[cardId]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useClass: CardIdValidatorDirective,
      multi: true,
    },
  ],
})
export class CardIdValidatorDirective implements AsyncValidator {
  constructor(private cardIdValidator: CardIdValidator) {}
  validate(
    control: FormControl
  ): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
    const validator = this.cardIdValidator.validate();
    return validator(control);
  }
}

@Injectable({ providedIn: 'root' })
export class CardIdValidator {
  constructor(private cardsService: CardsService) {}

  validate(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.cardsService.getCards().pipe(
        map((res) => {
          const index = res.findIndex((card) => card._id === control.value);
          return index>=0 ? null : { noCard: 'Carta Inesistente' };
        })
      );
    };
  }
}
