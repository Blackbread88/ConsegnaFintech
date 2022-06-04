import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

export function equalFieldValidator(fldName1:string,fldName2:string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(fldName1);
    const passwordRepeat = control.get(fldName2);

    return password && passwordRepeat && password.value !== passwordRepeat.value ? { repeatPassword: true } : null;
  }
};

//funzionante
/*export function equalFieldValidator(fldName1:string,fldName2:string): ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null =>{
    const password = control.get(fldName1);
    const passwordRepeat = control.get(fldName2);

    return controllaCampi(password,passwordRepeat);

    //return (control: AbstractControl): ValidationErrors | null => controllaCampi(password,passwordRepeat)

    //return password && passwordRepeat && password.value !== passwordRepeat.value ? { repeatPassword: true } : null;
  };
}*/

/*function controllaCampi(fld1:AbstractControl|null,fld2:AbstractControl|null): ValidationErrors|null {
  return fld1 && fld2 && fld1.value !== fld2.value ? { repeatPassword: true } : null;
}*/

@Directive({
  selector: '[equalField]',
  providers: [
    {provide: NG_VALIDATORS,
      useExisting:
      equalFieldValidatorDirective,
      multi: true}]
})

export class equalFieldValidatorDirective implements Validator {
@Input('fldName1') fldName1 = '';
@Input('fldName2') fldName2 = '';

validate(control: AbstractControl): ValidationErrors | null {
  const password = control.get(this.fldName1);
  const passwordRepeat = control.get(this.fldName2);
  return equalFieldValidator(this.fldName1,this.fldName2)(control)
  //return controllaCampi(password,passwordRepeat)
}

}
