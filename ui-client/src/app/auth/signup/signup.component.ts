import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
// import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {



   passwordFieldType: string = "password";
   passwordFieldIcon: string = "visibility_off";
   myForm: FormGroup;

   constructor() { }

   ngOnInit() {
      //  recaptcha: new FormControl(null, Validators.required)
      this.myForm = new FormGroup({
         email: new FormControl(null,
            { validators: [Validators.required, Validators.email] }),
         password: new FormControl(null,
            { validators: [Validators.required, Validators.minLength(6)] }),
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

      if (value.length < 8) {
         console.warn("Failed Length Check");
         return { password: { description: 'Password is too short' } };
      }
      if (value.match(/[ ]/)) {
         console.warn("Failed space Check");
         return { password: { description: 'Password must not contain spaces' } };
      }
      if (!value.match(/[A-Z]/)) {
         console.warn("Failed UpperCaseChar Check");
         return { password: { description: 'Password must contain one uppercase character' } };
      }
      if (!value.match(/[\d]/)) {
         console.warn("Failed numberic char check");
         return { password: { description: 'Password must contain one number' } };
      }

      // if (!value.match(/[^a-z0-9]/))
      //    return { password: { description: 'Password must contain one non alphanumberic character' } };
      return null;
   }

   formSubmit() {
      console.log(this.myForm);;
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
