import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent {
  @Output() editAddressCancel = new EventEmitter<boolean>();

  editForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.editForm = fb.group({
      houseNo: ['', Validators.required],
      building: ['', Validators.required],
      street: ['', Validators.required],
      barangay: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      zipcode: ['', Validators.required],
    });
  }

  get houseNo() {
    return this.editForm.get('houseNo') as FormControl;
  }
  get building() {
    return this.editForm.get('building') as FormControl;
  }
  get street() {
    return this.editForm.get('street') as FormControl;
  }
  get barangay() {
    return this.editForm.get('barangay') as FormControl;
  }
  get city() {
    return this.editForm.get('city') as FormControl;
  }
  get province() {
    return this.editForm.get('province') as FormControl;
  }
  get zipcode() {
    return this.editForm.get('zipcode') as FormControl;
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
    this.editAddressCancel.emit();
  }
}
