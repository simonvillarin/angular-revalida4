import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
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
  showPassword = false;
  errorMessage: string = '';

  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.loginForm.get('username') as FormControl;
  }
  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  togglePasswordVisibility = () => {
    this.showPassword = !this.showPassword;
  };

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
      }, (error) => {
        console.log('Login failed:', error);
        this.errorMessage = 'Invalid username or password. Please try again.';
      });
      this.loginForm.reset();
    }
  };

  forgotPassword = () => {
    this.router.navigate(['forgot/password']);
  };

  signUp = () => {};
}
