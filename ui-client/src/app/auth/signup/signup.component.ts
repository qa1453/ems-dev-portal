import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms'

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
      //this.loginForm.value.password = "";
      this.myForm = new FormGroup({
         email: new FormControl(null,
            { validators: [Validators.required, Validators.email] }),
         password: new FormControl(null,
            { validators: [Validators.required] }),
         company: new FormControl(null,
            { validators: [Validators.required, Validators.minLength(3)] }),
         agreeTermsConditions: new FormControl(null,
            { validators: [Validators.required] })
      });

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
