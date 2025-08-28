import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/show/products.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotComponent } from './components/forgot/forgot/forgot.component';
import { RegisterComponent } from './components/register/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { loginGuard } from './shared/guards/login.guard';
import { CrudProductComponent } from './components/products/crud/crud-product.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'forgot', component: ForgotComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'products/add', component: CrudProductComponent, canActivate: [authGuard] },
  { path: 'products/edit', component: CrudProductComponent, canActivate: [authGuard] },
];

//AddProductComponent
