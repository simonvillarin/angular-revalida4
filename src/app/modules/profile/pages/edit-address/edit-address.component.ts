import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/user-list/models/user';
import { UserListService } from 'src/app/modules/user-list/services/user-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss'],
})
export class EditAddressComponent {
  user: any;

  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserListService
  ) {
    this.userForm = fb.group({
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
    return this.userForm.get('houseNo')?.value;
  }
  get building() {
    return this.userForm.get('building')?.value;
  }
  get street() {
    return this.userForm.get('street')?.value;
  }
  get barangay() {
    return this.userForm.get('barangay')?.value;
  }
  get city() {
    return this.userForm.get('city')?.value;
  }
  get province() {
    return this.userForm.get('province')?.value;
  }
  get zipcode() {
    return this.userForm.get('zipcode')?.value;
  }

  ngOnInit(): void {
    this.getAddress();
  }

  getAddress = () => {
    let userId;
    const local = localStorage.getItem('user');
    if (local) {
      userId = JSON.parse(local).userId;
    }
    this.userService.getUserById(userId).subscribe((data: any) => {
      this.user = data;
      this.userForm.patchValue({
        houseNo: data.house,
        building: data.building,
        street: data.street,
        barangay: data.barangay,
        city: data.city,
        province: data.province,
        zipcode: data.zipcode,
      });
    });
  };

  onSubmit = () => {
    if (this.userForm.valid) {
      const payload = {
        house: this.houseNo,
        building: this.building,
        street: this.street,
        barangay: this.barangay,
        city: this.city,
        province: this.province,
        zipcode: this.zipcode,
      };

      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to edit this address?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, save it!',
        cancelButtonText: 'No, cancel',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          let userId;
          const local = localStorage.getItem('user');
          if (local) {
            userId = JSON.parse(local).userId;
          }

          this.userService
            .updateUser(userId, payload)
            .subscribe((res) => console.log(res));
          Swal.fire('Done!', 'User, Successfully Updated!.', 'success');
        }
      });
    }
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      console.log('Invalid Form');
      return;
    }
  };

  reset = () => {
    this.userForm.patchValue({
      houseNo: this.user.house,
      building: this.user.building,
      street: this.user.street,
      barangay: this.user.barangay,
      city: this.user.city,
      province: this.user.province,
      zipcode: this.user.zipcode,
    });
  };
}
