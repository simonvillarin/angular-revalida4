import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output,  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  mobileNumberContainLetters, 
  mobileNumberIsValid } 
from 'src/app/modules/validators/custom.validator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{
  @Output() editProfileCancel = new EventEmitter<boolean>();
  // BASE_URL = 'http://localhost:8080/api/v1/auth/login';

  // login = (user: any): Observable<User> => {
  //   return this.http.post<User>(`${this.BASE_URL}`, user);
  // };

  editForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.editForm = fb.group({
      fname: ['', Validators.required],
      mname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      mobileNo: ['', [
        Validators.required, 
        mobileNumberContainLetters(), 
        mobileNumberIsValid(),
      ]],
      bday: ['', Validators.required],
    });
  }

  get fname() {
    return this.editForm.get('fname') as FormControl;
  }
  get mname() {
    return this.editForm.get('mname') as FormControl;
  }
  get lname() {
    return this.editForm.get('lname') as FormControl;
  }
  get email() {
    return this.editForm.get('email') as FormControl;
  }
  get mobileNo() {
    return this.editForm.get('mobileNo') as FormControl;
  }
  get bday() {
    return this.editForm.get('bday') as FormControl;
  }

  ngOnInit(): void {}

  onSubmit = () => {
    if (this.editForm.valid) {
      // this.loginService.login(this.loginForm.value).subscribe((data) => {
      //   localStorage.setItem('user', JSON.stringify(data));
      //   if (data.role === 'ADMIN') {
      //     this.router.navigate(['/dashboard']);
      //   } else {
      //     this.router.navigate(['/home']);
      //   }
      // });
      this.editForm.reset();
    }
  };

  cancel() {
    this.editProfileCancel.emit();
  }
}
