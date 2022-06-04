import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

export function amountValidator(): ValidationErrors|null {
  return (control: AbstractControl): ValidationErrors | null => amountValidatorFn(control)
}

@Directive({
    selector: '[AmountValid]',
    providers: [
      {provide: NG_VALIDATORS,
        useExisting:
        amountValidatorDirective,
        multi: true}]
})

export class amountValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return amountValidatorFn(control)
  }
}

function amountValidatorFn(control: AbstractControl): ValidationErrors|null {
  if (Number(control.value)){
    if (Number(control.value)>0 && control.value.substring(0, 1)!=='0'){return null}
  }
  return {InvalidImport: 'Importo non valido'}

}
