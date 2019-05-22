import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class UsersService {

   currentUser: string = null;

   constructor() {
      this.currentUser = "default user";
      console.log("New Instance of UsersService!");
   }

   validateUser(email: string, password: string): boolean {
      console.log("Valiating user/pwd: " + email + "/" + password);
      this.currentUser = email;
      return true;
   }

   getCurrentUser() {
      return (this.currentUser);
   }
}
