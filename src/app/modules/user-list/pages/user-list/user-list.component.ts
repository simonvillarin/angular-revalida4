import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { hasLowercaseValidator, hasNumberValidator, hasSymbolValidator, hasUppercaseValidator } from 'src/app/modules/validators/custom.validator';

export interface User {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  birthdate: Date;
  username: string;
  password: string;
  listOfInterest: string[];
  role: string;
}

const ELEMENT_DATA: User[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'Kent',
    email: 'johndoe@email.com',
    birthdate: new Date('06-05-2023'),
    username: 'johndoe',
    password: 'pass123',
    listOfInterest: ['Desktop', 'Computer Components', 'Accessories'],
    role: 'User',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'Kent',
    email: 'johndoe@email.com',
    birthdate: new Date('06-05-2023'),
    username: 'johndoe',
    password: 'pass123',
    listOfInterest: ['Desktop', 'Computer Components', 'Accessories'],
    role: 'User',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'Kent',
    email: 'johndoe@email.com',
    birthdate: new Date('06-05-2023'),
    username: 'johndoe',
    password: 'pass123',
    listOfInterest: ['Desktop', 'Computer Components', 'Accessories'],
    role: 'User',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'Kent',
    email: 'johndoe@email.com',
    birthdate: new Date('06-05-2023'),
    username: 'johndoe',
    password: 'pass123',
    listOfInterest: ['Desktop', 'Computer Components', 'Accessories'],
    role: 'User',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'Kent',
    email: 'johndoe@email.com',
    birthdate: new Date('06-05-2023'),
    username: 'johndoe',
    password: 'pass123',
    listOfInterest: ['Desktop', 'Computer Components', 'Accessories'],
    role: 'User',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'Kent',
    email: 'johndoe@email.com',
    birthdate: new Date('06-05-2023'),
    username: 'johndoe',
    password: 'pass123',
    listOfInterest: ['Desktop', 'Computer Components', 'Accessories'],
    role: 'User',
  },
];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements AfterViewInit {
  userForm: FormGroup;
  isShowMenu: boolean = false;
  showPassword = false;
  showConfirmPassword = false;
  passwordMatch = true;

  allInterests: string[] = [
    'Desktop PC',
    'Notebooks',
    'Computer Components',
    'Computer Peripherals',
    'Accessories',
  ];

  @ViewChild('interestInput') interestInput!: ElementRef<HTMLInputElement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router,
              private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', [
            Validators.required,
            Validators.maxLength(80),
            Validators.minLength(2)
      ]],
      lastName: ['', [
            Validators.required,
            Validators.maxLength(80),
            Validators.minLength(2)
      ]],
      middleName: [''],
      birthDate: ['', Validators.required],
      email: ['', [
            Validators.required,
            Validators.email,
      ]],
      userName: ['', [
            Validators.required,
      ]],
      role: ['', Validators.required],
      password: ['',[
            Validators.required,
            Validators.minLength(8),
            hasNumberValidator(),
            hasLowercaseValidator(),
            hasUppercaseValidator(),
            hasSymbolValidator(),
      ]],
      confirmPass: ['', Validators.required]
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


  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'middleName',
    'birthdate',
    'username',
    'listOfInterest',
    'role',
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


  onSubmit(): void {
    if(this.userForm.valid){
      console.log(this.userForm.value);
    }

    if(this.userForm.invalid){
      this.userForm.markAllAsTouched();
      console.log('Invalid Form');
      return;
    }
  }

}
