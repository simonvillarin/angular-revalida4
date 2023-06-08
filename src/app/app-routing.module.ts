import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { activateGuard } from './core/guards/activate/activate.guard';
import { deactivateGuard } from './core/guards/deactivate/deactivate.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
    canDeactivate: [deactivateGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/signup/signup.module').then((m) => m.SignupModule),
    canDeactivate: [deactivateGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/main-page/main-page.module').then(
        (m) => m.MainPageModule
      ),
    canActivate: [activateGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/category/category.module').then(
        (m) => m.CategoryModule
      ),
    canActivate: [activateGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [activateGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/product-list/product-list.module').then(
        (m) => m.ProductListModule
      ),
    canActivate: [activateGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/user-list/user-list.module').then(
        (m) => m.UserListModule
      ),
    canActivate: [activateGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/orders/orders.module').then((m) => m.OrdersModule),
    canActivate: [activateGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/order-details/order-details.module').then(
        (m) => m.OrderDetailsModule
      ),
    canActivate: [activateGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/cart-page/cart-page.module').then(
        (m) => m.CartPageModule
      ),
    canActivate: [activateGuard],
  },
  {
    path: '',
    loadChildren: () => 
      import('./modules/error-page/error-page.module').then(
        (m) => m.ErrorPageModule
      ),
  },
  {
    path: '',
    loadChildren: () => 
      import('./modules/product-page/product.module').then(
        (m) => m.ProductModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
