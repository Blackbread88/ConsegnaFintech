import { Directive, Injectable, Input } from "@angular/core";
import { AbstractControl, AsyncValidator, AsyncValidatorFn, FormControl, NG_ASYNC_VALIDATORS, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { map, Observable } from "rxjs";
import { CardsService } from "src/app/api/cards.service";

@Injectable({ providedIn: 'root' })
export class TransferValidator {
  constructor(private cardsService: CardsService) {}

  validate(importoFldName:string,cartaFldName:string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const importoFld = control.get(importoFldName);
      const cartaFld = control.get(cartaFldName);
      return this.cardsService.getCards().pipe(
        map((ris) => {
          if (importoFld && cartaFld){
            const myCard = ris.find((card) => card._id === cartaFld.value);
            if (myCard?.amount){
              if(myCard?.amount> +importoFld.value){
                return null;
              }
            }
          }
          return {noSoldi:'Impossibile verificare la disponibilità della carta'};
        })
      );
    };
  }
}

@Directive({
  selector: '[DispCarta]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useClass: TransferValidatorDirective,
      multi: true,
    },
  ],
})
export class TransferValidatorDirective implements AsyncValidator {
  @Input('importoFldName') importoFldName!:string;
  @Input('cartaFldName') cartaFldName!:string;
  constructor(private myTransferValidator: TransferValidator) {}

  validate(control: FormControl): Observable<ValidationErrors | null> | Promise<ValidationErrors | null>{
    //const validator = this.myTransferValidator.validate(this.importoFldName,this.cartaFldName);
    const validator = this.myTransferValidator.validate('importo','carta');
    return validator(control);
  }
}
