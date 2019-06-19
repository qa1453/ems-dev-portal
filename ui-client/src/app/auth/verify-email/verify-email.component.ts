import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserAuthInfo } from '../authstates.enum';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
   selector: 'app-verify-email',
   templateUrl: './verify-email.component.html',
   styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
   public myFormGroup: FormGroup;
   public userAuthInfo: UserAuthInfo;

   constructor(
      public dialogRef: MatDialogRef<VerifyEmailComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
      public _snackBar: MatSnackBar,
      private authService: AuthService
   ) {
   }

   ngOnInit() {

      this.myFormGroup = new FormGroup({
         activationcode: new FormControl(null,
            { validators: [Validators.required] })
      })

      // subscribe to userAutoChanges
      this.authService.getUserInfoObs().subscribe((userAuthInfo) => {
         this.userAuthInfo = userAuthInfo;
      })
   }



   onVerifySubmit = () => {
      // make REST call to check if the activation code is valid
      // if not valid, indicate to the user and stay on this form.
      // if it is valid, we are done with this state and can return
      // dismiss the popup with a value of true.
      console.error("TODO: Mising code to validate email verification code");
      this.dialogRef.close(true);
   }

   onResendEmailSubmit = () => {
      this._snackBar.open(
         `Email has been sent to ${this.userAuthInfo.email}!`,
         "X Dismiss", {
            verticalPosition: 'top'
         });
      console.error("TODO: Missing code to resend verification email to user!")
   }
}
