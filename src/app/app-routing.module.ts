import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userExistsGuard } from './core/guards/user-exists/user-exists.guard';
import { userNotFoundGuard } from './core/guards/user-not-found/user-not-found.guard';
import { ErrorPage404Component } from './error-pages/pages/error-page404/error-page404.component';
import { adminExistsGuard } from './core/guards/admin-exists/admin-exists.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/main-page/main-page.module').then(
        (m) => m.MainPageModule
      ),
    canActivate: [userExistsGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
    canActivate: [userNotFoundGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/signup/signup.module').then((m) => m.SignupModule),
    canActivate: [userNotFoundGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/category/category.module').then(
        (m) => m.CategoryModule
      ),
      canActivate: [userExistsGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
      canActivate: [adminExistsGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/product-list/product-list.module').then(
        (m) => m.ProductListModule
      ),
      canActivate: [adminExistsGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/user-list/user-list.module').then(
        (m) => m.UserListModule
      ),
    canActivateChild: [adminExistsGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/orders/orders.module').then((m) => m.OrdersModule),
    canActivate: [userExistsGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/order-details/order-details.module').then(
        (m) => m.OrderDetailsModule
      ),
    canActivate: [userExistsGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/cart-page/cart-page.module').then(
        (m) => m.CartPageModule
      ),
    canActivate: [userExistsGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/product-page/product-page.module').then(
        (m) => m.ProductPageModule
      ),
    canActivate: [userExistsGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/product-page/product-page.module').then(
        (m) => m.ProductPageModule
      ),
    canActivate: [userExistsGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [userExistsGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/change-password/change-password.module').then(
        (m) => m.ChangePasswordModule
      ),
    canActivate: [userExistsGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
