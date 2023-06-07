import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  hasLowercaseValidator,
  hasNumberValidator,
  hasUppercaseValidator,
  hasSymbolValidator
} from '../../../validators/custom.validator';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //password icon
  customColor = '#4CAF50';
  image = 'login/src/assets/images/img.svg';

  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          hasLowercaseValidator(),
          hasNumberValidator(),
          hasUppercaseValidator(),
          hasSymbolValidator(),
        ],
      ],
    });
  }

  get username() {
    return this.loginForm.get('username') as FormControl;
  }
  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  ngOnInit(): void {}

  onSubmit = () => {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        if (data.role === 'ADMIN') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      });
      this.loginForm.reset();
    }
  };

  forgotPassword = () => {
    this.router.navigate(['forgot/password']);
  };

  signUp = () => {};
}
