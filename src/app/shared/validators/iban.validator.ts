import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

export function IBANValidator(): ValidationErrors|null {
  return (control: AbstractControl): ValidationErrors | null => IBANValidatorFn(control)
}

@Directive({
    selector: '[IBANValid]',
    providers: [
      {provide: NG_VALIDATORS,
        useExisting:
        IBANValidatorDirective,
        multi: true}]
})

export class IBANValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return IBANValidatorFn(control)
  }
}

function IBANValidatorFn(control: AbstractControl): ValidationErrors|null {
  if (control.value){
    const pattern=/^(?:(?:CR|DE|ME|RS|VA)\d{20}|(?:CZ|ES|SE|SK|TN)\d{22}|(?:DK|FI|FO|GL|SD)\d{16}|(?:AT|BA|EE|LT|XK)\d{18}|(?:AE|IL|TL)\d{21}|(?:LY|PT|ST)\d{23}|(?:IT|SM)\d{2}[A-Z]\d{10}[A-Za-z0-9]{12}|(?:HU|PL)\d{26}|(?:AL|CY)\d{10}[A-Za-z0-9]{16}|(?:CH|LI)\d{7}[A-Za-z0-9]{12}|(?:FR|MC)\d{12}[A-Za-z0-9]{11}\d{2}|(?:GB|IE)\d{2}[A-Z]{4}\d{14}|(?:KZ|LU)\d{5}[A-Za-z0-9]{13}|(?:GI|IQ)\d{2}[A-Z]{4}[A-Za-z0-9]{15}|(?:PK|RO)\d{2}[A-Z]{4}[A-Za-z0-9]{16}|(?:PS|QA)\d{2}[A-Z]{4}[A-Za-z0-9]{21}|AD\d{10}[A-Za-z0-9]{12}|AZ\d{2}[A-Z]{4}[A-Za-z0-9]{20}|BE\d{14}|BG\d{2}[A-Z]{4}\d{6}[A-Za-z0-9]{8}|BH\d{2}[A-Z]{4}[A-Za-z0-9]{14}|BR\d{25}[A-Z][A-Za-z0-9]|BY\d{2}[A-Za-z0-9]{4}\d{4}[A-Za-z0-9]{16}|DO\d{2}[A-Za-z0-9]{4}\d{20}|EG\d{27}|GE\d{2}[A-Z]\d{16}|GT\d{2}[A-Za-z0-9]{24}|GR\d{9}[A-Za-z0-9]{16}|HR\d{19}|IS\d{24}|JO\d{2}[A-Z]{4}\d{4}[A-Za-z0-9]{18}|KW\d{2}[A-Z]{4}[A-Za-z0-9]{22}|LC\d{2}[A-Z]{4}[A-Za-z0-9]{24}|LB\d{6}[A-Za-z0-9]{20}|LV\d{2}[A-Z]{4}\d{13}|MD\d{2}[A-Za-z0-9]{20}|MK\d{5}[A-Za-z0-9]{10}\d{2}|MR\d{25}|MT\d{2}[A-Z]{4}\d{5}[A-Za-z0-9]{18}|MU\d{2}[A-Z]{4}\d{19}[A-Z]{3}|NL\d{2}[A-Z]{4}\d{10}|NO\d{13}|SA\d{4}[A-Za-z0-9]{18}|SC\d{2}[A-Z]{4}\d{20}[A-Z]{3}|SI\d{17}|SV\d{2}[A-Z]{4}\d{20}|TR\d{8}[A-Za-z0-9]{16}|UA\d{8}[A-Za-z0-9]{19}|VG\d{2}[A-Z]{4}\d{16}|GE\d{2}[A-Z]{2}\d{16})$/
    if (pattern.test(control.value)){return null}
  }
  return {InvalidIBAN: 'IBAN non valido'}

}
