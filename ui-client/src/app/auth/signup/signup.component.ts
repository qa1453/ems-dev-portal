import { AfterViewInit, Component, OnDestroy, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CountryService, ICountry } from 'src/app/services/country.service';


// import { RecaptchaModule } from 'ng-recaptcha';
// import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit, OnDestroy {

   public myFormGroup: FormGroup;
   private formSubmitted = false;

   formFieldAppearance: string = "legacy"; // legayc|standard|fill|outline
   passwordFieldType: string = "password";
   password2FieldType: string = "password";


   constructor(
      public dialogRef: MatDialogRef<SignupComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
      private authService: AuthService,
      private router: Router,
      private ccService: CountryService
   ) {
   }

   ngOnInit() {
      //  recaptcha: new FormControl(null, Validators.required)
      this.myFormGroup = new FormGroup({
         firstname: new FormControl(null,
            { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)] }),
         lastname: new FormControl(null,
            { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)] }),
         email: new FormControl(null,
            { validators: [Validators.required, Validators.email] }),
         password: new FormControl(null,
            { validators: [Validators.required, Validators.minLength(6)] }),
         password2: new FormControl(null,
            { validators: [Validators.required, Validators.minLength(6)] }),
         company: new FormControl(null),
         country: new FormControl(null, { validators: [Validators.required] }),
         calling_code: new FormControl(null,
            { validators: [Validators.required] }),
         phone: new FormControl(null,
            { validators: [Validators.required] })
      });
   }

   onChanges(): void {
      // register a change handler for the country field
      // when it changes, update the filteredCountries and
      // also set the calling code to the first cc value from the filteredCountries

      this.myFormGroup.get('country')
         .valueChanges.subscribe(val => {

            // update the list of filtered countries
            this.ccService.applyCountryFilter(val);

            // now see if the country is an exact match,
            // and if so, update the callling code value.
            let tempRec: ICountry[] =
               this.ccService.allCountries.filter(
                  (x) => x.name === val);
            const newCCVal = (tempRec.length > 0) ? tempRec[0].cc : "-1";
            this.myFormGroup.get('calling_code').setValue(newCCVal);
         });
   }


   public clearCountry() {
      this.myFormGroup.get('country').setValue('');
   }


   ngAfterViewInit() {
      // setup event handlers to handle changes to form.
      this.onChanges();
   }

   ngOnDestroy() {
   }


   resolved(captchaResponse: string) {
      console.log(`Resolved captcha with response ${captchaResponse}:`);
   }

   onCancel = () => {
      this.dialogRef.close(false);
   }

   onSubmit = () => {
      if (this.formSubmitted === false) {
         this.formSubmitted = true;
         // submit this form to the server for processing
         if (1) {
            this.dialogRef.close(true);
         }
      }
      // ignore two or more quick submission attempts
   }

   togglePasswordVisibility() {
      this.passwordFieldType = (this.passwordFieldType === "password") ? "text" : "password";
   }

   togglePassword2Visibility() {
      this.password2FieldType = (this.password2FieldType === "password") ? "text" : "password";
   }

}

