import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserListService } from '../user-list/services/user-list.service';
import {
  hasLowercaseValidator,
  hasNumberValidator,
  hasSymbolValidator,
  hasUppercaseValidator,
} from 'src/app/modules/validators/custom.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  form: string = 'email';
  otpCode: any;
  showSpinner: boolean = false;
  showAlert: boolean = false;
  alert: string = '';
  userId: any;
  passwordMatch = true;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  emailForm: FormGroup;
  otpForm: FormGroup;
  passForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private userService: UserListService
  ) {
    this.emailForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.otpForm = fb.group({
      otp: ['', [Validators.required]],
    });
    this.passForm = fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          hasNumberValidator(),
          hasLowercaseValidator(),
          hasUppercaseValidator(),
          hasSymbolValidator(),
        ],
      ],
      confirmPass: ['', [Validators.required]],
    });
  }

  get email() {
    return this.emailForm.get('email') as FormControl;
  }
  get otp() {
    return this.otpForm.get('otp') as FormControl;
  }
  get password() {
    return this.passForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.passForm.get('confirmPass') as FormControl;
  }

  ngOnInit(): void {}

  onSubmitEmail = () => {
    const email = this.emailForm.get('email')?.value;
    const payload = {
      to: email,
    };

    const checkEmail = {
      email: email,
    };

    if (this.emailForm.valid) {
      this.http
        .post('http://localhost:8080/api/v1/auth/user/email', checkEmail)
        .subscribe((res: any) => {
          console.log(res.id);
          this.userId = res.id;
          if (res.message == 'Email not found') {
            this.showAlert = true;
            this.alert =
              "Sorry, we couldn't find your email address in our database.";
            setTimeout(() => (this.showAlert = false), 3000);
          } else {
            this.http
              .post('http://localhost:8080/api/v1/auth/email', payload)
              .subscribe((res: any) => {
                this.otpCode = res;
                console.log(res);
              });
            this.showSpinner = true;
            setTimeout(() => {
              this.showSpinner = false;
              this.form = 'otp';
            }, 3000);
            this.emailForm.reset();
          }
        });
    } else {
      this.emailForm.markAllAsTouched();
      return;
    }
  };

  onSubmitOTP = () => {
    console.log('hello');
    const otp = this.otpForm.get('otp')?.value;
    if (this.otpForm.valid) {
      if (this.otpCode == otp) {
        this.otpForm.reset();
        this.alert = 'OTP code is invalid';
        this.form = 'pass';
      } else {
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 3000);
      }
    } else {
      this.otpForm.markAllAsTouched();
      return;
    }
  };

  onSubmitPass = () => {
    const pass = this.passForm.get('password')?.value;
    const payload = {
      password: pass,
    };
    this.http
      .put(`http://localhost:8080/api/v1/auth/user/${this.userId}`, payload)
      .subscribe((res) => console.log(res));

    Swal.fire({
      text: 'User successfully Updated.',
      icon: 'success',
      confirmButtonText: 'Ok',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
  };
}
