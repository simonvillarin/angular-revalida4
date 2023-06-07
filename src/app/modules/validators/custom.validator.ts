import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

//Validate Password (login)
export const hasNumberValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const hasNumber = /\d/.test(control.value);
        return hasNumber ? null : { hasNumber: true };
    }
}

export const hasLowercaseValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const hasLowercase = /[a-z]/.test(control.value);
        return hasLowercase ? null : { hasLowercase: true };
    }
}

export const hasUppercaseValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const hasUppercase = /[A-Z]/.test(control.value);
        return hasUppercase ? null : { hasUppercase: true };
    }
}

export const hasSymbolValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
        return hasSymbol ? null : { hasSymbol: true };
    };
};

//Validate Mobile Number (forgot password)
export const mobileNumberIsValid = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const isValid = /^(09|\+639)\d{9}$/.test(control.value);
        return isValid ? null : { mobileNoIsValid: true };
    }
}

export const mobileNumberContainLetters = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const containsLetters = /[a-zA-Z]/.test(control.value);
        return containsLetters ? { mobileNoHasNoLetters: true } : null;
    }
}

// zip validator
export const maxLengthValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value && value.toString().length > 4) {
            return { maxLength: true };
        }
        return null;
    }
}

// birthday
export const birthdateValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const selectedDate = control.value;
        const today = new Date();
        const selectedDateObj = new Date(selectedDate);
    
        if (selectedDateObj >= today) {
          return { futureDate: true };
        }
    
        return null;
      };
}

