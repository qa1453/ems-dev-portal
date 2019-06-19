import { Component, OnInit, Optional, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserAuthInfo } from '../authstates.enum';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { ICountries, ICallingCodes } from '../countries-interface';
import { Observable } from 'rxjs';
import { CountryCodesService } from '../countrycodes.service';
import { startWith, delay, map } from 'rxjs/operators';

@Component({
   selector: 'app-verify-sms',
   templateUrl: './verify-sms.component.html',
   styleUrls: ['./verify-sms.component.scss']
})
export class VerifySmsComponent implements OnInit, AfterViewInit, OnDestroy {
   public phoneNumFormGroup: FormGroup;
   public activationCodeFormGroup: FormGroup;
   public userAuthInfo: UserAuthInfo;
   public formFieldAppearance: string = "legacy";
   public emailCodeSent = false;

   // allCountries is the complete list of allCountries (the initial value)
   // filteredCountries is the list that's filtered based on user input
   public allCountries: ICountries[];
   public filteredCountries: Observable<ICountries[]>;
   public callingCodes: ICallingCodes[];

   constructor(public dialogRef: MatDialogRef<VerifySmsComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
      public _snackBar: MatSnackBar,
      private authService: AuthService,
      private countryCodeService: CountryCodesService) {
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
      this.authService.getUserInfoObs().subscribe((userAuthInfo) => {
         console.log("VerifyEmail. New userAuthInfo obj received: " + userAuthInfo);
         this.userAuthInfo = userAuthInfo;
      });


      this.countryCodeService.getCountries()
         .subscribe(data => {
            // store the data 
            this.allCountries = data.sort(this.myCompare);
            console.log("Countries Loaded");
         });

      this.countryCodeService.getCallingCodes()
         .subscribe(data => {
            this.callingCodes = data;
            console.log("Calling Codes Loaded");
         });
   }


   ngAfterViewInit() {
      // setup event handlers to handle changes to form.
      this.onChanges();
   }

   onChanges(): void {
      // register a change handler for the country field
      this.filteredCountries = this.phoneNumFormGroup.get('country').valueChanges
         .pipe(
            startWith(''),
            delay(0),
            map(val => this.filterCountries(val))
         );
      this.phoneNumFormGroup.get('country').valueChanges.subscribe(val => {
         // take the value and try to lookup a calling code for this country
         const ccRecs: ICallingCodes[] = this.callingCodes.filter((ccRec) => { return ccRec.country === val });
         let ccVal = "-1";
         if (ccRecs.length === 0) {
            // this.phoneNumFormGroup.get('countrty').setErrors({ 'invalid': true })
         } else {
            // this.phoneNumFormGroup.get('countrty').setErrors({ 'invalid': false })
            ccVal = `+${ccRecs[0].calling_code}`;
         }
         this.phoneNumFormGroup.get('calling_code').setValue(ccVal);
      });
   }

   private filterCountries(val: string): ICountries[] {
      const lcVal = val ? val.toLowerCase() : '';
      if (!this.allCountries) {
         return [];
      }
      return this.allCountries.filter(c => c.country.toLowerCase().indexOf(lcVal) != -1);
   }

   public clearCountry() {
      this.phoneNumFormGroup.get('country').setValue('');
   }


   myCompare(a, b) {
      let countryA = a.country.toUpperCase();
      let countryB = b.country.toUpperCase();

      if (countryA > countryB) return (1);
      if (countryA < countryB) return (-1);
      return 0;
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
