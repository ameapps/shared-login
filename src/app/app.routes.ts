import { Routes } from '@angular/router';
import { AreaPrivataComponent } from './area-privata.component';
import { LoginComponent } from './login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'area-privata', component: AreaPrivataComponent }
];
