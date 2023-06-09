import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cp-confirm-email',
  templateUrl: './cp-confirm-email.component.html',
  styleUrls: ['./cp-confirm-email.component.scss']
})
export class CpConfirmEmailComponent implements OnInit{
  changePassForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.changePassForm = fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.changePassForm.get('email') as FormControl;
  }

  ngOnInit(): void {
      
  }

  onSubmit() {
    this.router.navigate(['confirm/change/password'])
  }
}
