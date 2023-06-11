import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  hasLowercaseValidator,
  hasNumberValidator,
  hasSymbolValidator,
  hasUppercaseValidator,
  mobileNumberContainLetters,
  mobileNumberIsValid,
  numberLengthValidator,
} from 'src/app/modules/validators/custom.validator';
import { User } from '../../models/user';
import { UserListService } from '../../services/user-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, AfterViewInit {
  userForm: FormGroup;
  isShowMenu: boolean = false;
  showPassword = false;
  showConfirmPassword = false;
  passwordMatch = true;
  isActionEdit = false;
  buttonAction: string = 'ADD';
  id: number = 0;
  search: string = '';
  alert: string = '';
  showAlert: boolean = false;

  allInterests: string[] = [
    'Desktop PC',
    'Notebooks',
    'Computer Components',
    'Computer Peripherals',
    'Accessories',
  ];

  @ViewChild('interestInput') interestInput!: ElementRef<HTMLInputElement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers = () => {
    this.userListService.getAllUsers().subscribe((data) => {
      const sortData = data.sort((a, b) => a.userId - b.userId);
      this.dataSource.data = sortData;
    });
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userListService: UserListService
  ) {
    this.userForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(80),
          Validators.minLength(2),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(80),
          Validators.minLength(2),
        ],
      ],
      middleName: [''],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          mobileNumberContainLetters(),
          mobileNumberIsValid(),
        ],
      ],
      userName: ['', [Validators.required]],
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
      houseNo: ['', Validators.required],
      buildingName: [''],
      streetName: ['', Validators.required],
      brgy: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', [Validators.required, numberLengthValidator()]],
      province: ['', Validators.required],
      confirmPass: ['', Validators.required],
      role: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.userForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswordMatch();
    });
    this.userForm.get('confirmPass')?.valueChanges.subscribe(() => {
      this.checkPasswordMatch();
    });
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  logout = () => {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  };

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'middleName',
    'birthday',
    'email',
    'phoneNumber',
    'username',
    'role',
    'status',
    'actions',
  ];

  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  showAddOption: boolean = false;
  newOption: string | undefined;

  onOptionSelected(event: any) {
    if (event.value === 'add') {
      this.showAddOption = true;
    } else {
      this.showAddOption = false;
    }
  }

  addNewOption() {
    if (this.newOption && !this.options.includes(this.newOption)) {
      this.options.push(this.newOption);
      this.newOption = '';
      this.showAddOption = true;
    }
  }

  rowMatchesSearch = (row: any): boolean => {
    if (this.search === '') {
      return true;
    }

    const values = Object.values(row);
    for (const value of values) {
      if (
        value &&
        value.toString().toLowerCase().includes(this.search.toLowerCase())
      ) {
        return true;
      }
    }

    return false;
  };

  editUser = (id: number, user: User) => {
    this.buttonAction = 'EDIT';
    this.isActionEdit = true;
    this.id = id;

    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      birthDate: user.birthdate,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userName: user.username,
      passowrd: user.password,
      role: user.role,
      status: user.status,
    });
  };

  deleteUser = (id: number) => {
    const payload: any = {
      status: false,
    };

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to deactivate this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userListService.getUserById(id).subscribe((data) => {
          if (data.status) {
            this.userListService
              .updateUser(data.userId, payload)
              .subscribe((res) => console.log(res));
            const index = this.dataSource.data.findIndex(
              (user) => user.userId === id
            );
            this.dataSource.data[index].status = false;
            Swal.fire('Done!', 'User successfully deleted.', 'success');
          } else {
            Swal.fire('Error', 'User already deactivated', 'error');
          }
        });
      }
    });
  };

  resetAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You're about to reset the form",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reset it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.reset();
      }
    });
  }

  reset = () => {
    this.userForm.reset();
    this.isActionEdit = false;
    this.buttonAction = 'ADD';
  };

  onSubmit(): void {
    if (this.isActionEdit == false) {
      this.userForm.patchValue({
        status: true,
      });

      const user: any = {
        firstName: this.userForm.get('firstName')?.value,
        lastName: this.userForm.get('lastName')?.value,
        middleName: this.userForm.get('middleName')?.value,
        birthdate: this.userForm.get('birthDate')?.value,
        email: this.userForm.get('email')?.value,
        phoneNumber: this.userForm.get('phoneNumber')?.value,
        username: this.userForm.get('userName')?.value,
        password: this.userForm.get('password')?.value,
        role: this.userForm.get('role')?.value,
        status: this.userForm.get('status')?.value,
      };

      if (this.userForm.valid) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to add new product?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, save it!',
          cancelButtonText: 'No, cancel',
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            this.userListService.addUser(user).subscribe((res: any) => {
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
                this.dataSource.data = [...this.dataSource.data, user];
                Swal.fire('Done!', 'User, Successfully Added!.', 'success');
              }
            });
          }
        });
      }

      if (this.userForm.invalid) {
        this.userForm.markAllAsTouched();
        console.log('Invalid Form');
        return;
      }
      this.userForm.reset();
    } else {
      this.userListService.getUserById(this.id).subscribe((data) => {
        const firstName = this.userForm.get('firstName')?.value;
        const lastName = this.userForm.get('lastName')?.value;
        const middleName = this.userForm.get('middleName')?.value;
        const birthdate = this.userForm.get('birthDate')?.value;
        const email = this.userForm.get('email')?.value;
        const phoneNumber = this.userForm.get('phoneNumber')?.value;
        const username = this.userForm.get('userName')?.value;
        const password = this.userForm.get('password')?.value;
        const role = this.userForm.get('role')?.value;
        const status = this.userForm.get('status')?.value;

        let user: any = {
          firstName: firstName,
          lastName: lastName,
          middleName: middleName,
          birthdate: birthdate,
          role: role,
          status: status,
        };

        if (password == '') {
          this.userForm.patchValue({
            password: 'sample',
            confirmPass: 'sample',
          });

          if (
            email != data.email &&
            username != data.username &&
            phoneNumber != data.phoneNumber
          ) {
            user.email = email;
            user.username = username;
            user.phoneNumber = phoneNumber;
          } else if (email != data.email && username != data.username) {
            user.email = email;
            user.username = username;
          } else if (email != data.email && phoneNumber != data.phoneNumber) {
            user.email = email;
            user.phoneNumber = phoneNumber;
          } else if (
            username != data.username &&
            phoneNumber != data.phoneNumber
          ) {
            user.username = username;
            user.phoneNumber = phoneNumber;
          } else if (email != data.email) {
            user.email = email;
          } else if (username != data.username) {
            user.username = username;
          } else if (phoneNumber != data.phoneNumber) {
            user.phoneNumber = phoneNumber;
          }
        } else {
          if (password != data.password) {
            user.password = password;
          }
        }

        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to edit this user?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, edit it!',
          cancelButtonText: 'No, cancel',
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            this.userListService
              .updateUser(this.id, user)
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
                  const index = this.dataSource.data.findIndex(
                    (user) => user.userId === this.id
                  );
                  this.dataSource.data[index].firstName =
                    this.userForm.get('firstName')?.value;
                  this.dataSource.data[index].lastName =
                    this.userForm.get('lastName')?.value;
                  this.dataSource.data[index].middleName =
                    this.userForm.get('middleName')?.value;
                  this.dataSource.data[index].birthdate =
                    this.userForm.get('birthDate')?.value;
                  this.dataSource.data[index].email =
                    this.userForm.get('email')?.value;
                  this.dataSource.data[index].phoneNumber =
                    this.userForm.get('phoneNumber')?.value;
                  this.dataSource.data[index].username =
                    this.userForm.get('userName')?.value;
                  this.dataSource.data[index].password =
                    this.userForm.get('password')?.value;
                  this.dataSource.data[index].role =
                    this.userForm.get('role')?.value;

                  let status = false;
                  if (this.userForm.get('status')?.value) {
                    status = true;
                  } else {
                    status = false;
                  }
                  this.dataSource.data[index].status = status;

                  this.buttonAction = 'ADD';
                  this.isActionEdit = false;
                  Swal.fire('Done!', 'User, Successfully Updated!.', 'success');
                  this.userForm.reset();
                }
              });
          }
        });
      });
    }
  }
}
