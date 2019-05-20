import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms'

@Component({
   selector: 'app-forgot-password',
   templateUrl: './forgot-password.component.html',
   styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

   myFormControl: FormGroup;

   constructor() { }

   ngOnInit() {
      this.myFormControl = new FormGroup({
         email: new FormControl(null,
            { validators: [Validators.required, Validators.email] })
      });

   }

   onSubmit() {
      console.log(this.myFormControl.value.email, this.myFormControl.value.password);
   }
}

