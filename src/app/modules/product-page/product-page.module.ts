import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { RatingComponent } from './components/rating/rating.component';
import { ProductPageRoutingModule } from './product-page-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    ProductComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
    SharedModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ]
})
export class ProductPageModule { }
