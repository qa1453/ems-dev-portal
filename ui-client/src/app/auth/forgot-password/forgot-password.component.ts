import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms'
import { AuthService } from '../auth.service';

@Component({
   selector: 'app-forgot-password',
   templateUrl: './forgot-password.component.html',
   styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

   myForm: FormGroup;
   forgotPasswordFailed: boolean = false;

   constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
      public _snackBar: MatSnackBar,
      private authService: AuthService) { }

   ngOnInit() {
      this.myForm = new FormGroup({
         email: new FormControl(null,
            { validators: [Validators.required, Validators.email] })
      });
   }

   onCancel() {
      this.dialogRef.close();
   }

   onSubmit() {
      // try to submit this request to the server
      this.forgotPasswordFailed = this.authService.handleForgotPasswordRequest(this.myForm.value.email);
      if (this.forgotPasswordFailed) {
         this._snackBar.open(
            "Please check your email for instructions!", "X Dismiss", {
               verticalPosition: 'top'
            });
         // duration: 5000 (w/out a duration parameter the snackbar stays up until it's dismissed)
         this.dialogRef.close();
      } else {
         // leave the dialog up with the error;
      }
   }
}

