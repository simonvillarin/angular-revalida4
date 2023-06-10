import { Component } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  user: any[] = [
    { 
      fname: "Chanyeol",
      mname: "Oh",
      lname: "Park",
      email: "parkchan@gmail.com",
      mobileNo: "09123245231",
      bday: "1992-11-23",
      houseNo: 123,
      building: "3489",
      street: "Aguinaldo St.",
      barangay: "Masawi",
      city: "Baguio",
      province: "Any province",
    }
  ]

  // Edit div
  showAddressCont:boolean = true;
  showEditForm:boolean = false;

  toggleEditMode() {
    this.showAddressCont = !this.showAddressCont;
    this.showEditForm = !this.showEditForm;
  }

  cancel() {
    this.showAddressCont = true;
    this.showEditForm = false;
  }
}
