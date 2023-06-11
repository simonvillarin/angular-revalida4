import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/login/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any[] = [
    {
      username: 'chanchan22',
      fname: 'Chanyeol',
      mname: 'Oh',
      lname: 'Park',
      email: 'parkchan@gmail.com',
      mobileNo: '09123245231',
      bday: '1992-11-23',
      listOfInterest: ['painting', 'dancing', 'singing'],
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('hello');
  }

  // Edit div
  showProfileCont: boolean = true;
  showEditForm: boolean = false;

  toggleEditMode() {
    this.showProfileCont = !this.showProfileCont;
    this.showEditForm = !this.showEditForm;
  }

  cancel() {
    this.showEditForm = false;
    this.showProfileCont = true;
  }

  navigateChangePassword() {
    this.router.navigate(['change/password']);
  }
}
