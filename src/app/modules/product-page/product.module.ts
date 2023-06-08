import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './component/product-page/product-page.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RatingModule } from 'ngx-bootstrap/rating';
import { RatingComponent } from './component/rating/rating.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductPageComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    FormsModule,
    RatingModule
  ]
})
export class ProductModule { }
