import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material';
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
   private formSubmitAttempt: boolean;

   formFieldAppearance: string = "legacy"; // legayc|standard|fill|outline
   passwordFieldType: string = "password";
   passwordFieldIcon: string = "visibility_off";
   password2FieldType: string = "password";
   password2FieldIcon: string = "visibility_off";

   // allCountries is the complete list of allCountries (the initial value)
   // filteredCountries is the list that's filtered based on user input
   public allCountries: ICountries[];
   public filteredCountries: Observable<ICountries[]>;
   public callingCodes: ICallingCodes[];

   @ViewChild('singleSelect') singleSelect: MatSelect;

   constructor(
      private authService: AuthService,
      private router: Router,
      private countryCodeService: CountryCodesService) {
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



   // onChanges(): void {
   //    // when the country code is selected, update the calling code for the selected country
   //    // Need to first find the long country name given the abbreivation.
   //    // Then, using the long country name, I can find the calling code.
   //    this.myFormGroup.get('country').valueChanges.subscribe(val => {
   //       let newValue = this.myFormGroup.get('country').value;
   //       console.log("New Country Value: " + newValue);
   //       // the next line causes an infinite loop of change detection
   //       //this.myFormGroup.get('country').setValue(newValue);
   //       let callingCodeObj = this.callingCodes.filter((obj) => { return obj.country == val });
   //       if (callingCodeObj.length <= 0) {
   //          console.warn("No matching calling code found for: [" + val + "]");
   //       } else {
   //          this.myFormGroup.get('calling_code').setValue(callingCodeObj[0].calling_code);
   //       }
   //    });
   // }


   resolved(captchaResponse: string) {
      console.log(`Resolved captcha with response ${captchaResponse}:`);
   }

   // Password Complexity Rules:
   // must be at least 8 characters long 
   // must not contain spaces
   // must contain at least one upper case letter
   // must contain at least one number
   // must contain one non-alphanumberic character.
   passwordValidator(control: FormControl): { [key: string]: any } {
      const value = control.value || '';
      console.log("Validating password! " + value);
      return null;
   }

   formSubmit() {

      console.log(this.myFormGroup);

      const result = this.authService.signup(this.myFormGroup.value);
      if (result) {
         alert(`SIGNUP Accepted for user ${this.myFormGroup.value.email}`);
         this.router.navigate(['/home']);
      } else {
         alert("Invalid User: " + this.myFormGroup.value.email);
      }
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
   togglePassword2Visibility() {
      if (this.password2FieldType == "password") {
         this.password2FieldType = "text";
         this.password2FieldIcon = "visibility_on"
      } else {
         this.password2FieldType = "password";
         this.password2FieldIcon = "visibility_off";
      }
   }
}

