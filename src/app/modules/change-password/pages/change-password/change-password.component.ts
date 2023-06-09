import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { hasLowercaseValidator, hasNumberValidator, hasSymbolValidator, hasUppercaseValidator } from 'src/app/modules/validators/custom.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changePassForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.changePassForm = fb.group({
      confirmPass: ['', Validators.required],
      newPass: ['', [
          Validators.required,
          Validators.minLength(8),
          hasNumberValidator(),
          hasLowercaseValidator(),
          hasUppercaseValidator(),
          hasSymbolValidator(),
        ],
      ],
    });
  }

  get newPass() {
    return this.changePassForm.get('newPass') as FormControl;
  }
  get confirmPass() {
    return this.changePassForm.get('confirmPass') as FormControl;
  }

  onSubmit() {
    
  }
}
