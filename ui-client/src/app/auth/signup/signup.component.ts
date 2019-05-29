import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


// import { RecaptchaModule } from 'ng-recaptcha';
// import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

   passwordFieldType: string = "password";
   passwordFieldIcon: string = "visibility_off";
   password2FieldType: string = "password";
   password2FieldIcon: string = "visibility_off";
   myForm: FormGroup;


   constructor(private authService: AuthService, private router: Router) {
   }

   ngOnInit() {
      //  recaptcha: new FormControl(null, Validators.required)
      this.myForm = new FormGroup({
         firstName: new FormControl(),
         lastName: new FormControl(),
         email: new FormControl(null,
            { validators: [Validators.required, Validators.email] }),
         password: new FormControl(null,
            { validators: [Validators.required, Validators.minLength(6)] }),
         password2: new FormControl(),
         company: new FormControl(null,
            { validators: [Validators.required, Validators.minLength(3)] })
      });
   }

   resolved(captchaResponse: string) {
      console.log(`Resolved captcha with response ${captchaResponse}:`);
   }

   // Password Complexity Rules:
   // must be at least 8 characters long 
   // must not contain spaces
   // must contain at least one upper case letter
   // must contain at least one number
   // must contain one non-alphanumberic character.
   passwordValidator(control: FormControl): { [key: string]: any } {
      const value = control.value || '';
      console.log("Validating password! " + value);
      return null;
   }

   formSubmit() {

      console.log(this.myForm);

      const result = this.authService.signup(this.myForm.value);
      if (result) {
         alert(`SIGNUP Accepted for user ${this.myForm.value.email}`);
         this.router.navigate(['/home']);
      } else {
         alert("Invalid User: " + this.myForm.value.email);
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
   togglePassword2Visibility() {
      if (this.password2FieldType == "password") {
         this.password2FieldType = "text";
         this.password2FieldIcon = "visibility_on"
      } else {
         this.password2FieldType = "password";
         this.password2FieldIcon = "visibility_off";
      }
   }
}

