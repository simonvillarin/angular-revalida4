import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ProductListRoutingModule } from './product-list-routing.module';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    ProductListRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
  ],
})
export class ProductListModule {

}
