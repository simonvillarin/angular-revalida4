import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobileMask'
})
export class MobileMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const maskedValue = value.replace(/(\d{3})(\d+)(\d{2})/, (_, prefix, middle, suffix) => {
      const maskedMiddle = '*'.repeat(middle.length);
      return prefix + maskedMiddle + suffix;
    });

    return '+63 ' + maskedValue;
  }
}


@Pipe({
  name: 'emailMask'
})
export class EmailMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const [username, domain] = value.split('@');
    const maskedUsername = this.maskMiddleCharacters(username);

    return maskedUsername + '@' + domain;
  }

  private maskMiddleCharacters(str: string): string {
    const length = str.length;
    const visibleCharacters = 1;
    const maskedCharacters = length - visibleCharacters;

    return str.substring(0, visibleCharacters) + '*'.repeat(maskedCharacters) + str.substring(length - visibleCharacters);
  }
}
