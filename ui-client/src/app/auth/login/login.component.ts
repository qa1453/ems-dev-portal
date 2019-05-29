import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   passwordFieldType: string = "password";
   passwordFieldIcon: string = "visibility_off";
   loginForm: FormGroup;

   constructor(private authService: AuthService, private router: Router) {
   }

   ngOnInit() {
      //this.loginForm.value.password = "";
      this.loginForm = new FormGroup({
         email: new FormControl(null,
            { validators: [Validators.required, Validators.email] }),
         password: new FormControl(null,
            { validators: [Validators.required] })
      });

   }

   onSubmit() {
      let validUser = false;

      console.log(this.loginForm.value.email,
         this.loginForm.value.password);

      validUser = this.authService.login(this.loginForm.value);
      if (validUser) {
         //location.reload();
         this.router.navigate(['/home']);
      } else {
         alert('Invalid user/password combination... try again');
         console.error("Invalid User: " + this.loginForm.value.email);
      }
   }

   togglePasswordVisibility() {
      if (this.passwordFieldType == "password") {
         this.passwordFieldType = "text";
         this.passwordFieldIcon = "visibility_on"
      } else {
         this.passwordFieldType = "password";
         this.passwordFieldIcon = "visibility_off";
      }
   }
}

