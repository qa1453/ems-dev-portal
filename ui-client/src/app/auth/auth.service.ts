import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { SignupInterface } from './signup-interface';
import { LoginInterface } from './login-interface';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AuthStates, UserAuthInfo } from './authstates.enum';

const USER_AUTH_STORAGE_KEY = 'DEVPORTAL_USER_AUTH_STATE';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   private curUser: UserAuthInfo = null;
   private curUserSub = new BehaviorSubject<UserAuthInfo>(this.curUser);

   constructor(
      @Inject(LOCAL_STORAGE) private storageService: StorageService,
      private router: Router) {

      this.curUser = this.storageService.get(USER_AUTH_STORAGE_KEY);
      if (!this.curUser) {
         this.initCurUserObj();
         this.storageService.set(USER_AUTH_STORAGE_KEY, this.curUser);
      }
      this.curUserSub.next(this.curUser);
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

   login(user: LoginInterface) {
      this.curUser.state = AuthStates.loggedIn;
      this.curUser.email = user.email;
      this.curUser.firstname = "Test";
      this.curUser.lastname = "User";
      this.storageService.set(USER_AUTH_STORAGE_KEY, this.curUser);
      this.curUserSub.next(this.curUser);
      return true;
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
