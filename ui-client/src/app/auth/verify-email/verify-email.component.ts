import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserAuthInfo } from '../authstates.enum';

@Component({
   selector: 'app-verify-email',
   templateUrl: './verify-email.component.html',
   styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
   public verifyFormGroup: FormGroup;
   public userAuthInfo: UserAuthInfo;

   constructor(private authService: AuthService) { }

   ngOnInit() {

      this.verifyFormGroup = new FormGroup({
         activationcode: new FormControl(null,
            { validators: [Validators.required] })
      })

      // subscribe to userAutoChanges
      this.authService.getUserInfoObs().subscribe((userAuthInfo) => {
         console.log("VerifyEmail. New userAuthInfo obj received: " + userAuthInfo);
         this.userAuthInfo = userAuthInfo;
      })
   }



   verifyEmailSubmit = () => {
      alert("Verify Email Requested");
   }

   resendEmailSubmit = () => {
      alert("Resend Email Requested");
   }
}
