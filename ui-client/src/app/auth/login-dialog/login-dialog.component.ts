import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-login-dialog',
   templateUrl: './login-dialog.component.html',
   styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
   passwordFieldType: string = "password";
   passwordFieldIcon: string = "visibility_off";
   loginForm: FormGroup;
   loginFailed: boolean = false;


   constructor(
      public dialogRef: MatDialogRef<LoginDialogComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
      private authService: AuthService, private router: Router) {

   }

   ngOnInit() {
      this.loginForm = new FormGroup({
         email: new FormControl(null,
            { validators: [Validators.required, Validators.email] }),
         password: new FormControl(null,
            { validators: [Validators.required] })
      });
   }

   onCancel(): void {
      this.dialogRef.close();
   }

   onLogin(): void {

      let validUser = this.authService.login(this.loginForm.value);
      if (validUser) {
         this.dialogRef.close();
         this.router.navigate(['/home']);
      } else {
         this.loginFailed = true;
      }

   }

   onForgotPassword(): void {
      this.dialogRef.close();
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
