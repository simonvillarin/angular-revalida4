import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserListService } from 'src/app/modules/user-list/services/user-list.service';
import {
  mobileNumberContainLetters,
  mobileNumberIsValid,
} from 'src/app/modules/validators/custom.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Output() editProfileCancel = new EventEmitter<boolean>();
  showPassword = false;
  showConfirmPassword = false;
  passwordMatch = true;
  user: any;
  alert: string = '';
  showAlert: boolean = false;
  userId: any;

  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private userListService: UserListService
  ) {
    this.userForm = fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          mobileNumberContainLetters(),
          mobileNumberIsValid(),
        ],
      ],
      birthDate: ['', Validators.required],
      listOfInterest: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required],
    });
  }

  get firstName() {
    return this.userForm.get('firstName')?.value;
  }
  get lastName() {
    return this.userForm.get('lastName')?.value;
  }
  get middleName() {
    return this.userForm.get('middleName')?.value;
  }
  get birthDate() {
    return this.userForm.get('birthDate')?.value;
  }
  get email() {
    return this.userForm.get('email')?.value;
  }
  get phoneNumber() {
    return this.userForm.get('phoneNumber')?.value;
  }
  get username() {
    return this.userForm.get('username')?.value;
  }
  get password() {
    return this.userForm.get('password')?.value;
  }

  checkPasswordMatch(): void {
    const confirmPasswordControl = this.userForm.get('confirmPass');
    const password = this.userForm.get('password')?.value;
    const confirmPassword = confirmPasswordControl?.value;
    this.passwordMatch = password === confirmPassword;
    if (confirmPasswordControl?.dirty || confirmPasswordControl?.touched) {
      if (!this.passwordMatch) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
    this.checkPasswordMatch();
  }

  ngOnInit(): void {
    this.getProfile();
  }

  onSubmit = () => {
    const local = localStorage.getItem('user');
    if (local) {
      this.userId = JSON.parse(local).userId;
    }

    this.userListService.getUserById(this.userId).subscribe((data) => {
      let user: any = {
        firstName: this.firstName,
        lastName: this.lastName,
        middleName: this.middleName,
        birthdate: this.birthDate,
      };

      if (
        this.email != data.email &&
        this.username != data.username &&
        this.phoneNumber != data.phoneNumber
      ) {
        user.email = this.email;
        user.username = this.username;
        user.phoneNumber = this.phoneNumber;
      } else if (this.email != data.email && this.username != data.username) {
        user.email = this.email;
        user.username = this.username;
      } else if (
        this.email != data.email &&
        this.phoneNumber != data.phoneNumber
      ) {
        user.email = this.email;
        user.phoneNumber = this.phoneNumber;
      } else if (
        this.username != data.username &&
        this.phoneNumber != data.phoneNumber
      ) {
        user.username = this.username;
        user.phoneNumber = this.phoneNumber;
      } else if (this.email != data.email) {
        user.email = this.email;
      } else if (this.username != data.username) {
        user.username = this.username;
      } else if (this.phoneNumber != data.phoneNumber) {
        user.phoneNumber = this.phoneNumber;
      }

      if (this.password != data.password) {
        user.password = this.password;
      }

      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to edit this profile?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, edit it!',
        cancelButtonText: 'No, cancel',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.userListService
            .updateUser(this.userId, user)
            .subscribe((res: any) => {
              console.log(res);
              if (res.message == 'Email already exists') {
                this.alert = 'Email already exists';
                this.showAlert = true;
                setTimeout(() => (this.showAlert = false), 3000);
              } else if (res.message == 'Username already exists') {
                this.alert = 'Username already exists';
                this.showAlert = true;
                setTimeout(() => (this.showAlert = false), 3000);
              } else if (res.message == 'Phone number already exists') {
                this.alert = 'Phone number already exists';
                this.showAlert = true;
                setTimeout(() => (this.showAlert = false), 3000);
              } else {
                Swal.fire('Done!', 'User, Successfully Updated!.', 'success');
              }
            });
        }
      });
    });
  };

  getProfile = () => {
    let userId;
    const local = localStorage.getItem('user');
    if (local) {
      userId = JSON.parse(local).userId;
    }
    this.userListService.getUserById(userId).subscribe((data: any) => {
      this.user = data;
      this.userForm.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        birthDate: data.birthdate,
        email: data.email,
        phoneNumber: data.phoneNumber,
        userName: data.username,
      });
    });
  };

  reset = () => {
    this.userForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      middleName: this.user.middleName,
      birthDate: this.user.birthdate,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      userName: this.user.username,
    });
  };

  cancel() {
    this.editProfileCancel.emit();
  }
}
