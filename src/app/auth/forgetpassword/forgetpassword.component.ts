import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent  {
   isLoading = false;
  constructor(public authService: AuthService) {}

  onForgetPassword(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = false;
    this.authService.forgetPassword(form.value.email, form.value.password);
  }

}
