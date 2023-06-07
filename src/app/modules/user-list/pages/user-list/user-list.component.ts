import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';

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
  isShowMenu: boolean = false;
  interestCtrl = new FormControl('');
  filteredInterests: Observable<string[]>;
  separatorKeysCodes: number[] = [13, 188];
  interests: string[] = [];
  allInterests: string[] = [
    'Desktop PC',
    'Notebooks',
    'Computer Components',
    'Computer Peripherals',
    'Accessories',
  ];

  @ViewChild('interestInput') interestInput!: ElementRef<HTMLInputElement>;

  constructor(private router: Router) {
    this.filteredInterests = this.interestCtrl.valueChanges.pipe(
      startWith(null),
      map((interest: string | null) =>
        interest ? this._filter(interest) : this.allInterests.slice()
      )
    );
  }

  toggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  logout = () => {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  };

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.interests.includes(value)) {
      this.interests.push(value);
    }
    event.chipInput!.clear();

    this.interestCtrl.setValue(null);
  }

  remove(interest: string): void {
    const index = this.interests.indexOf(interest);
    if (index >= 0) {
      this.interests.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (value && !this.interests.includes(value)) {
      this.interests.push(value);
    }
    this.interestInput.nativeElement.value = '';
    this.interestCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allInterests.filter((interest) =>
      interest.toLowerCase().includes(filterValue)
    );
  }

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

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
}
