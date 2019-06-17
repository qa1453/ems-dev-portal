import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginResult } from '../login-interface';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   passwordFieldType: string = "password";
   loginForm: FormGroup;
   loginFailed: boolean = false;


   constructor(
      public dialogRef: MatDialogRef<LoginComponent>,
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

   togglePasswordVisibility() {
      this.passwordFieldType = (this.passwordFieldType === "password") ? "text" : "password";
   }

   onCancel(): void {
      this.dialogRef.close(LoginResult.Canceled);
   }

   onLogin(): void {

      let validUser = this.authService.login(this.loginForm.value);
      if (validUser) {
         this.dialogRef.close(LoginResult.Success);
         this.router.navigate(['/home']);
      } else {
         this.loginFailed = true;
      }
   }

   onForgotPassword(): void {
      this.dialogRef.close(LoginResult.ForgotPassword);
   }
}
