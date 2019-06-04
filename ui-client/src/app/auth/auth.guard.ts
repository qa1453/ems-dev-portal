import { Injectable } from '@angular/core';
import {
   CanActivate,
   ActivatedRouteSnapshot,
   RouterStateSnapshot,
   UrlTree,
   Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AuthStates } from './authstates.enum';

@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate {

   constructor(
      private authService: AuthService,
      private router: Router
   ) {
      // 
   }

   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // let requiredAuthState = route.data.authState || AuthStates.loggedOut;
      return true;
      // return this.authService.authUserSubject 
      //    .pipe(
      //       take(1),
      //       map((userAuthInfo: UserAuthInfo) => {
      //          if (authStates != requiredAuthState) {
      //             this.router.navigate(['/splash']);
      //             return false;
      //          }
      //          return true;
      //       })
      //    );
   }
}
