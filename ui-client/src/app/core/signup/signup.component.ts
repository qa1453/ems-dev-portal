import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

   public hide = true;
   email = new FormControl('', [Validators.required, Validators.email]);

   getErrorMessage() {
      return this.email.hasError('required') ? 'You must enter a value' :
         this.email.hasError('email') ? 'Not a valid email' : '';
   }

   constructor() { }

   ngOnInit() {
   }
}
