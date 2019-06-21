import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { SignupInterface } from './signup/signup-interface';
import { LoginInterface } from './login/login-interface';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// import { AuthStates, UserAuthInfo } from './user-info.interface';
import { UserAccountRoles, UserAccountStates, UserAccountTypes, UserSessionInfo } from './user-session-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const USER_AUTH_STORAGE_KEY = 'DEVPORTAL_USER_AUTH_STATE';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   private curUser: UserSessionInfo = null;
   private curUserSubject = new BehaviorSubject<UserSessionInfo>(this.curUser);


   constructor(
      @Inject(LOCAL_STORAGE) private storageService: StorageService,
      private router: Router,
      private http: HttpClient) {

      this.curUser = this.storageService.get(USER_AUTH_STORAGE_KEY);
      if (!this.curUser) {
         this.initCurUserObj();
         this.storageService.set(USER_AUTH_STORAGE_KEY, this.curUser);
      }
      this.curUserSubject.next(this.curUser);
   }

   // Standard "getter" that is called when another piece of code references
   // this element as a variable (i.e. not referenced as a function call)
   // can be referenced in templates or other TS code.
   get userInfoAsObservable() {
      return this.curUserSubject.asObservable();
   }

   get userSessInfo$() {
      return this.curUserSubject.asObservable();
   }


   login = (user: LoginInterface): boolean => {

      let url = "http://localhost/devportal/login.php";
      this.http.post(url, JSON.stringify(user))
         .subscribe(
            (success) => { console.log("Login Success: " + success) },
            (error) => { console.error("Login Failed: " + error) },
            () => { console.log("Waiting for login to complete") }
         );
      // If Success, update the local session info and associated subject.
      if (1) {
         this.curUser = {
            sessionId: "MySESSIONID",
            email: user.email,
            firstname: "Fake",
            lastname: "User",
            country: "United States",
            calling_code: "+1",
            phone: "3125882300",
            company: "Infinite Convergence",
            account_role: UserAccountRoles.regular,
            account_type: UserAccountTypes.trial,
            account_state: UserAccountStates.loggedIn,
            account_create_date: new Date(),
            account_expired_date: new Date(),
            account_balance: 0,
            account_limit: 500
         }

         this.storageService.set(USER_AUTH_STORAGE_KEY, this.curUser);
         this.curUserSubject.next(this.curUser);

         return true;
      }
      return false;

   }

   signup = (user: SignupInterface): boolean => {

      // Issue the signup request to the server
      // If success, update the local session info and associated subject.

      if (1) {
         this.storageService.set(USER_AUTH_STORAGE_KEY, this.curUser);
         this.curUserSubject.next(this.curUser);
         return true;
      }
      return false;
   }



   handleForgotPasswordRequest = (email: string): boolean => {
      console.log("Forgot Password request for email: " + email);
      if (email.startsWith('tom')) {
         return true;
      }
      return false;
   }

   getUserEmail(): string {
      return this.curUser.email;
   }

   getFullName(): string {
      return this.curUser.firstname + " " + this.curUser.lastname;
   }

   logout() {
      this.initCurUserObj();
      this.storageService.set(USER_AUTH_STORAGE_KEY, this.curUser);
      this.curUserSubject.next(this.curUser);
      this.router.navigate(['/splash']);
   }

   private initCurUserObj() {
      this.curUser = {
         sessionId: "",
         email: "",
         firstname: "",
         lastname: "",
         country: "",
         calling_code: "",
         phone: "",
         company: "",
         account_role: UserAccountRoles.unknown,
         account_state: UserAccountStates.loggedOut,
         account_type: UserAccountTypes.unknown,
         account_create_date: null,
         account_expired_date: null,
         account_balance: 0,
         account_limit: 0
      };
   }

}
