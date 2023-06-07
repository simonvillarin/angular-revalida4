import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListRoutingModule } from './user-list-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { UserListComponent } from './pages/user-list/user-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, MatIconModule, RouterModule, 
            UserListRoutingModule, MatAutocompleteModule, 
            MatChipsModule, MatFormFieldModule, MatInputModule,
            ReactiveFormsModule, MatTableModule, MatPaginatorModule,
            MatSelectModule, FormsModule, MatButtonModule],
})
export class UserListModule {}
