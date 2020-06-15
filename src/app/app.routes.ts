import {RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { GramComponent } from './gram/gram.component';
import { ForgetpasswordComponent } from './auth/forgetpassword/forgetpassword.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/gram', pathMatch: 'full'},
  { path: 'gram',  component: GramComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent}
]
