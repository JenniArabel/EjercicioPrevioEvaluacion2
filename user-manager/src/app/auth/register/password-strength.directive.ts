import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[passwordStrength]'
})
export class PasswordStrengthDirective {
  @Output() strengthChange = new EventEmitter<'Débil' | 'Media' | 'Fuerte'>();

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.strengthChange.emit(this.getStrength(value));
  }

  getStrength(password: string): 'Débil' | 'Media' | 'Fuerte' {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return 'Débil';
    if (score === 2 || score === 3) return 'Media';
    return 'Fuerte';
  }
}
