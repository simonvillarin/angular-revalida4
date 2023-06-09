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
} from 'src/app/modules/validators/custom.validator';
import { User } from '../../models/user';
import { UserListService } from '../../services/user-list.service';

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
      phoneNumber: ['', Validators.required],
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
      role: user.role,
      status: user.status,
    });
  };

  deleteUser = (id: number) => {
    const payload: any = {
      status: false,
    };

    this.userListService.getUserById(id).subscribe((data) => {
      if (data.status) {
        this.userListService
          .updateUser(id, payload)
          .subscribe((res) => console.log(res));
        const index = this.dataSource.data.findIndex(
          (user) => user.userId === id
        );
        this.dataSource.data[index].status = false;
      } else {
        console.log('User already deactivated');
      }
    });
  };

  reset = () => {
    this.userForm.reset();
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
        this.userListService.addUser(user).subscribe((res) => console.log(res));
        this.dataSource.data = [...this.dataSource.data, user];
      }

      if (this.userForm.invalid) {
        this.userForm.markAllAsTouched();
        console.log('Invalid Form');
        return;
      }
    } else {
      let user: any;

      if (this.userForm.get('password') == null) {
        this.userForm.patchValue({
          password: 'sample',
          confirmPass: 'sample',
        });

        const user = {
          firstName: this.userForm.get('firstName')?.value,
          lastName: this.userForm.get('lastName')?.value,
          middleName: this.userForm.get('middleName')?.value,
          birthdate: this.userForm.get('birthDate')?.value,
          phoneNumber: this.userForm.get('phoneNumber')?.value,
          password: this.userForm.get('password')?.value,
          role: this.userForm.get('role')?.value,
          status: this.userForm.get('status')?.value,
        };
      } else {
        user = {
          firstName: this.userForm.get('firstName')?.value,
          lastName: this.userForm.get('lastName')?.value,
          middleName: this.userForm.get('middleName')?.value,
          birthdate: this.userForm.get('birthDate')?.value,
          phoneNumber: this.userForm.get('phoneNumber')?.value,
          password: this.userForm.get('password')?.value,
          role: this.userForm.get('role')?.value,
          status: this.userForm.get('status')?.value,
        };
      }

      this.userListService
        .updateUser(this.id, user)
        .subscribe((res) => console.log(res));
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
      this.dataSource.data[index].email = this.userForm.get('email')?.value;
      this.dataSource.data[index].phoneNumber =
        this.userForm.get('phoneNumber')?.value;
      this.dataSource.data[index].username =
        this.userForm.get('userName')?.value;
      this.dataSource.data[index].password =
        this.userForm.get('password')?.value;
      this.dataSource.data[index].role = this.userForm.get('role')?.value;

      let status = false;
      console.log(this.userForm.get('status')?.value);
      if (this.userForm.get('status')?.value) {
        status = true;
      } else {
        status = false;
      }
      this.dataSource.data[index].status = status;

      this.buttonAction = 'ADD';
      this.isActionEdit = false;
    }
    this.userForm.reset();
  }
}
