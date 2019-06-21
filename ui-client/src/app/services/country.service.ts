import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface ICountry {
   name: string;
   abbr: string;
   cc: string;
}


// for local use only, to aid in parsing the input file.
interface IInnerItem {
   cc: string;
   code: string;
   mcc: string;
   name: string;
   tc: string;
}

// for local use only, to aid in parsing the input file.
interface IOuterItem {
   Data: IInnerItem;
}


@Injectable({
   providedIn: 'root'
})
export class CountryService {
   public allCountries: ICountry[] = [];
   public filteredCountries$: Observable<ICountry[]>;

   constructor(private http: HttpClient) {

      this.http.get('../../assets/country_table.json')
         .subscribe((data: IOuterItem[]) => {
            ///console.log(data);
            data.forEach((item, index) => {
               //console.log(item.Data);
               this.allCountries.push({
                  name: item.Data.name,
                  abbr: item.Data.code,
                  cc: item.Data.cc
               })
            })

            // assign all countries to the filterered countries
            // as an observable
            this.filteredCountries$ = of(this.allCountries);
         })
   }

   public applyCountryFilter(fVal: string) {

      if (fVal.length == 0) {
         this.filteredCountries$ = of(this.allCountries);
         return;
      }

      fVal = fVal.toLowerCase();
      this.filteredCountries$ =
         of(this.allCountries.filter(
            c => c.name.toLowerCase().indexOf(fVal) != -1));
   }
}
