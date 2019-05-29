import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SignupInterface } from './signup-interface';
import { LoginInterface } from './login-interface';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   private loggedIn = new BehaviorSubject<boolean>(false);
   private curUser: string = null;

   constructor(private router: Router) {
   }

   get isLoggedIn() {
      return this.loggedIn.asObservable();
   }

   signup(user: SignupInterface): boolean {
      if (user.email !== '' && user.password !== '') {
         this.loggedIn.next(true);
         this.curUser = user.email;
         return true;
      } else {
         this.curUser = null;
         return false;
      }
   }

   login(user: LoginInterface) {
      this.loggedIn.next(true);
      this.curUser = user.email;
      return true;
   }

   getUserEmail(): string {
      return this.curUser;
   }

   logout() {
      this.loggedIn.next(false);
      this.curUser = null;
      this.router.navigate(['/splash']);
   }

}
