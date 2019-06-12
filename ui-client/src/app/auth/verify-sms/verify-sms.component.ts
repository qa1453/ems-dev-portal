import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserAuthInfo } from '../authstates.enum';

@Component({
   selector: 'app-verify-sms',
   templateUrl: './verify-sms.component.html',
   styleUrls: ['./verify-sms.component.scss']
})
export class VerifySmsComponent implements OnInit {
   public verifyFormGroup: FormGroup;
   public userAuthInfo: UserAuthInfo;

   constructor(private authService: AuthService) {

   }

   ngOnInit() {
      this.verifyFormGroup = new FormGroup({
         verificationcode: new FormControl(null,
            { validators: [Validators.required] })
      })

      // subscribe to userAutoChanges
      this.authService.getUserInfoObs().subscribe((userAuthInfo) => {
         console.log("VerifyEmail. New userAuthInfo obj received: " + userAuthInfo);
         this.userAuthInfo = userAuthInfo;
      })
   }

}
