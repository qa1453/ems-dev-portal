import { Component, OnInit, Optional, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserSessionInfo } from '../user-session-info';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { CountryService, ICountry } from 'src/app/services/country.service';

@Component({
   selector: 'app-verify-sms',
   templateUrl: './verify-sms.component.html',
   styleUrls: ['./verify-sms.component.scss']
})
export class VerifySmsComponent implements OnInit, AfterViewInit, OnDestroy {
   public phoneNumFormGroup: FormGroup;
   public activationCodeFormGroup: FormGroup;
   public userSessionInfo: UserSessionInfo;
   public formFieldAppearance: string = "legacy";
   public emailCodeSent = false;


   constructor(public dialogRef: MatDialogRef<VerifySmsComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
      public _snackBar: MatSnackBar,
      private authService: AuthService,
      private ccService: CountryService) {
   }

   ngOnInit() {
      this.phoneNumFormGroup = new FormGroup({
         country: new FormControl(null,
            [Validators.required]),
         calling_code: new FormControl(null,
            [Validators.required,
            Validators.pattern("[\+]{1}[0-9]{1,8}")]),
         phone: new FormControl(null,
            [Validators.required])
      });

      this.activationCodeFormGroup = new FormGroup({
         activationCode: new FormControl(null,
            [Validators.required])
      });

      // subscribe to userAutoChanges
      this.authService.userInfoAsObservable.subscribe((userSessionInfo) => {
         console.log("VerifyEmail. New userAuthInfo obj received: " + userSessionInfo);
         this.userSessionInfo = userSessionInfo;
      });
   }


   ngAfterViewInit() {
      // setup event handlers to handle changes to form.
      this.onChanges();
   }

   onChanges(): void {

      // register a change handler for the country field
      // when it changes, update the filteredCountries and
      // also set the calling code to the first cc value from the filteredCountries

      this.phoneNumFormGroup.get('country')
         .valueChanges.subscribe(val => {

            // update the list of filtered countries
            this.ccService.applyCountryFilter(val);

            // now see if the country is an exact match,
            // and if so, update the callling code value.
            let tempRec: ICountry[] =
               this.ccService.allCountries.filter(
                  (x) => x.name === val);
            const newCCVal = (tempRec.length > 0) ? tempRec[0].cc : "-1";
            this.phoneNumFormGroup.get('calling_code').setValue(newCCVal);
         });
   }

   public clearCountry() {
      this.phoneNumFormGroup.get('country').setValue('');
   }

   ngOnDestroy() {
   }

   onSendSMSCode() {
      // send the SMS Code

      // inform the user with a snackbar
      this._snackBar.open(
         "An activation code has been sent in an SMS to your phone",
         "X Dismiss", {
            duration: 4000,
            verticalPosition: 'top'
         })
         .afterDismissed()
         .subscribe(() => {
            this.emailCodeSent = true;
         })

   }

   onVerifySMSCode() {
      // Verify the entered code with the server

   }
}
