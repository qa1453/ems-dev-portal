import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { SignupInterface } from './signup-interface';
import { LoginInterface } from './login-interface';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AuthStates, UserAuthInfo } from './authstates.enum';

const USER_AUTH_STORAGE_KEY = 'DEVPORTAL_USER_AUTH_STATE';

// temporary
class ProxyUser {
   firstname: string;
   lastname: string;
   email: string;
   password: string;
   company: string;
   country: string;
   calling_code: string;
   phone: string;
   email_code: string;
   phone_code: string;
   forgot_pwd_code: string;
   admin: boolean;
}


@Injectable({
   providedIn: 'root'
})
export class AuthService {

   private curUser: UserAuthInfo = null;
   private curUserSub = new BehaviorSubject<UserAuthInfo>(this.curUser);

   // temporary structure/fcns to use to test the UI until the backend is available
   private tempUsers: ProxyUser[] = [];

   constructor(
      @Inject(LOCAL_STORAGE) private storageService: StorageService,
      private router: Router) {

      this.curUser = this.storageService.get(USER_AUTH_STORAGE_KEY);
      if (!this.curUser) {
         this.initCurUserObj();
         this.storageService.set(USER_AUTH_STORAGE_KEY, this.curUser);
      }
      this.curUserSub.next(this.curUser);

      // create some users:
      for (let i = 0; i < 10; i++) {
         let adminUser = true;
         this.tempUsers.push({
            firstname: `First Name-${i}`,
            lastname: `Last Name-${i}`,
            email: `user${i}@mail.com`,
            password: `user${i}`,
            company: "ACME",
            country: "Unitied States",
            calling_code: "1",
            phone: `312588230${1}`,
            email_code: "",
            phone_code: "",
            forgot_pwd_code: "",
            admin: adminUser
         });
         adminUser = false;
      }
   }

   // Standard "getter" that is called when another piece of code references
   // this element as a variable (i.e. not referenced as a function call)
   // can be referenced in templates or other TS code.
   get userInfo() {
      return this.curUserSub.asObservable();
   }

   getUserInfoObs() {
      return this.curUserSub.asObservable();
   }


   signup = (user: SignupInterface): boolean => {
      // signup(user: SignupInterface): boolean {
      let retVal = false;

      if (user.email !== '' && user.password !== '') {
         this.curUser = {
            state: AuthStates.emailConfirmPending,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            callingcode: user.calling_code,
            phone: user.phone,
            activationcode: Math.random().toString(36).substring(2, 15) // temporary, I believe.
         };
         this.storageService.set(USER_AUTH_STORAGE_KEY, this.curUser);
         this.curUserSub.next(this.curUser);
         retVal = true;
      }

      return retVal;
   }

   login = (user: LoginInterface): boolean => {
      this.curUser.state = AuthStates.loggedIn;
      this.curUser.email = user.email;
      this.curUser.firstname = "Test";
      this.curUser.lastname = "User";
      this.storageService.set(USER_AUTH_STORAGE_KEY, this.curUser);
      this.curUserSub.next(this.curUser);
      return true;
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
      this.curUserSub.next(this.curUser);
      this.router.navigate(['/splash']);
   }

   private initCurUserObj() {
      this.curUser = {
         state: AuthStates.loggedOut,
         email: "",
         firstname: "",
         lastname: ""
      };
   }

}
