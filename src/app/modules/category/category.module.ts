import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './pages/category/category.component';
import { RouterModule } from '@angular/router';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppComponent } from 'src/app/app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    RouterModule,
    CategoryRoutingModule,
    SharedModule,
    MatSliderModule,
    MatCheckboxModule,
    FormsModule,
  ],
  exports: [RouterModule],
})
export class CategoryModule {}
