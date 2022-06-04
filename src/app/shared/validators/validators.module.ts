import { NgModule } from '@angular/core';
import { amountValidatorDirective } from './amount.validators';
import { IBANValidatorDirective } from './iban.validator';
import { equalFieldValidatorDirective } from './equal-fields.validator';
import { CodiceFiscaleValidatorDirective } from './codice-fiscale.validator';
import { CardIdValidatorDirective } from './card-id.validator';
import { TransferValidatorDirective } from './transfer.validator';

@NgModule({
  declarations: [
    amountValidatorDirective,
    IBANValidatorDirective,
    equalFieldValidatorDirective,
    CodiceFiscaleValidatorDirective,
    CardIdValidatorDirective,
    TransferValidatorDirective
  ],
  imports: [],
  exports: [
    amountValidatorDirective,
    IBANValidatorDirective,
    equalFieldValidatorDirective,
    CodiceFiscaleValidatorDirective,
    CardIdValidatorDirective,
    TransferValidatorDirective
  ]
})
export class ValidatorsModule { }
