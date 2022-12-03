import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordContainsNumber(control: AbstractControl): ValidationErrors | null {
  const regex= /\d/;

  if(regex.test(control.value) && control.value !== null) {
    return null;
  } else {
    return { passwordInvalid: true };
  }
}

export function passwordsMatch (control: AbstractControl): ValidationErrors | null {
  const password = control.parent?.get('password')?.value;
  const confirmPassword = control.parent?.get('confirmPassword')?.value;

  if((password === confirmPassword) && (password !== null && confirmPassword !== null)) {
    return null;
  } else {
    return { passwordsNotMatching: true };
  }
}

export function advancedSearchValidator(control: AbstractControl): ValidationErrors | null {
  return control.value.scope !== null && control.value.query !== ''
    ? null
    : {
        validateSearch: {
          valid: true,
        },
      };
}
