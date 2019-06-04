import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICountries, ICallingCodes } from './countries-interface';

@Injectable({
   providedIn: 'root'
})
export class CountryCodesService {
   private _countryUrl = '../../assets/country-by-abbreviation.json';
   private _callingCodesUrl = '../../assets/country-by-calling-code.json';

   constructor(private http: HttpClient) {

   }

   getCountries(): Observable<ICountries[]> {
      return this.http.get<ICountries[]>(this._countryUrl);
   }

   getCallingCodes(): Observable<ICallingCodes[]> {
      return this.http.get<ICallingCodes[]>(this._callingCodesUrl);
   }

}
