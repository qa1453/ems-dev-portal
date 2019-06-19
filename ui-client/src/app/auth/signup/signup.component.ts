import { AfterViewInit, Component, OnDestroy, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { startWith, delay, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CountryCodesService } from '../countrycodes.service';
import { ICountries, ICallingCodes } from '../countries-interface';


// import { RecaptchaModule } from 'ng-recaptcha';
// import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit, OnDestroy {

   public myFormGroup: FormGroup;
   private formSubmitAttempt = false;

   formFieldAppearance: string = "legacy"; // legayc|standard|fill|outline
   passwordFieldType: string = "password";
   password2FieldType: string = "password";

   // allCountries is the complete list of allCountries (the initial value)
   // filteredCountries is the list that's filtered based on user input
   public allCountries: ICountries[];
   public filteredCountries: Observable<ICountries[]>;
   public callingCodes: ICallingCodes[];


   constructor(
      public dialogRef: MatDialogRef<SignupComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
      private authService: AuthService,
      private router: Router,
      private countryCodeService: CountryCodesService
   ) {
   }

   ngOnInit() {
      //  recaptcha: new FormControl(null, Validators.required)
      this.myFormGroup = new FormGroup({
         firstname: new FormControl(null,
            { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30)] }),
         lastname: new FormControl(null,
            { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30)] }),
         email: new FormControl(null,
            { validators: [Validators.required, Validators.email] }),
         password: new FormControl(null,
            { validators: [Validators.required, Validators.minLength(6)] }),
         password2: new FormControl(),
         company: new FormControl(null),
         country: new FormControl(null, { validators: [Validators.required] }),
         calling_code: new FormControl(null,
            { validators: [Validators.required] }),
         phone: new FormControl(null,
            { validators: [Validators.required] })
      });

      this.countryCodeService.getCountries()
         .subscribe(data => {
            // store the data 
            this.allCountries = data.sort(this.myCompare);
         });

      this.countryCodeService.getCallingCodes()
         .subscribe(data => {
            this.callingCodes = data;
         });
   }

   onChanges(): void {
      // register a change handler for the country field
      this.filteredCountries = this.myFormGroup.get('country').valueChanges
         .pipe(
            startWith(''),
            delay(0),
            map(val => this.filterCountries(val))
         );
      this.myFormGroup.get('country').valueChanges.subscribe(val => {
         // take the value and try to lookup a calling code for this country
         const ccRecs: ICallingCodes[] = this.callingCodes.filter((ccRec) => { return ccRec.country === val });
         const ccVal = ccRecs.length > 0 ? ccRecs[0].calling_code : '-1';
         this.myFormGroup.get('calling_code').setValue(ccVal);
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
      this.myFormGroup.get('country').setValue('');
   }


   myCompare(a, b) {
      let countryA = a.country.toUpperCase();
      let countryB = b.country.toUpperCase();

      if (countryA > countryB) return (1);
      if (countryA < countryB) return (-1);
      return 0;
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


   passwordValidator(control: FormControl): { [key: string]: any } {
      const value = control.value || '';
      console.log("Validating password! " + value);
      return null;
   } false

   onCancel = () => {
      this.dialogRef.close(true /* false*/);
   }

   onSubmit = () => {
      this.dialogRef.close(true);
   }

   // formSubmit() {

   //    console.log(this.phoneNumFormGroup);

   //    const result = this.authService.signup(this.phoneNumFormGroup.value);
   //    if (result) {
   //       alert(`SIGNUP Accepted for user ${this.phoneNumFormGroup.value.email}`);
   //       this.router.navigate(['/home']);
   //    } else {
   //       alert("Invalid User: " + this.phoneNumFormGroup.value.email);
   //    }
   // }

   togglePasswordVisibility() {
      this.passwordFieldType = (this.passwordFieldType === "password") ? "text" : "password";
   }

   togglePassword2Visibility() {
      this.password2FieldType = (this.password2FieldType === "password") ? "text" : "password";
   }

}

