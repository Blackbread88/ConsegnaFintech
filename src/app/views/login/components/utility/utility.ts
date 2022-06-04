import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidControl = control?.invalid;
    const invalidParent = control?.parent?.hasError('repeatPassword');
    const userActions = control?.dirty || control?.touched || form?.submitted;

    return !!((invalidControl || invalidParent) && userActions);
  }
}
