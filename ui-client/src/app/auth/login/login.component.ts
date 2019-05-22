import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms'
import { UsersService } from '../../shared/services/users.service';
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
   usersService: UsersService;
   router: Router;

   constructor(usersService: UsersService, router: Router) {
      this.usersService = usersService;
      this.router = router;
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
      let validUser = false;;

      validUser = this.usersService.validateUser(
         this.loginForm.value.email,
         this.loginForm.value.password);
      if (validUser) {
         this.router.navigate(['/home']);
      } else {
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

