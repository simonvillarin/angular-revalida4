import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './component/profile-page/profile-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddressComponent } from './pages/address/address.component';
import { PorfileRoutingModule } from './porfile-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmailMaskPipe, MobileMaskPipe } from './pipe/data-mask.pipe';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditAddressComponent } from './pages/edit-address/edit-address.component';



@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileComponent,
    AddressComponent,
    MobileMaskPipe,
    EmailMaskPipe,
    EditProfileComponent,
    EditAddressComponent
  ],
  imports: [
    CommonModule,
    PorfileRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProfileModule { }
