import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { mobileNumberContainLetters, mobileNumberIsValid } from '../validators/custom.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  //password icon
  hide = true;

  forgotPasswordForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.forgotPasswordForm = fb.group({
      username: ['', [Validators.required]],
      mobileNo: ['', [
        Validators.required, 
        mobileNumberContainLetters(), 
        mobileNumberIsValid(),
      ]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  get email() {
    return this.forgotPasswordForm.get('email') as FormControl;
  }
  get mobileNo() {
    return this.forgotPasswordForm.get('mobileNo') as FormControl;
  }
  get username() {
    return this.forgotPasswordForm.get('username') as FormControl;
  }

  ngOnInit(): void {
  }

  onSubmit = () => {
    if(this.forgotPasswordForm.valid) {
      this.router.navigate(['login']);
      console.log('Successfully logged in.')
    }
  }
}
