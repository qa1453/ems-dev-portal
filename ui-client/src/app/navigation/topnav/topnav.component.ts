import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthStates, UserAuthInfo } from 'src/app/auth/authstates.enum';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { LoginResult } from 'src/app/auth/login-interface';
import { ForgotPasswordComponent } from '../../auth/forgot-password/forgot-password.component';

@Component({
   selector: 'app-topnav',
   templateUrl: './topnav.component.html',
   styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
   @Output() toggleSideBar = new EventEmitter<void>();
   AuthStates = AuthStates;
   userAuthInfo$: Observable<UserAuthInfo>;

   public topNavLoggedOut = [
      {
         title: "PRODUCT",
         subLinks: [
            {
               title: "SMS",
               href: "/",
               icon: "chat_bubble_outline"
            }, {
               title: "AUTHENTICATE",
               href: "/",
               icon: "security"
            }, {
               title: "VALIDATE",
               href: "/",
               icon: "thumb_up_alt"
            }, {
               title: "LOOKUP",
               href: "/",
               icon: "thumb_up_alt"
            }, {
               title: "NUMBERS",
               href: "/",
               icon: "computer"
            }
         ]
      }, {
         title: "USE CASES",
         href: "usecases"
      }, {
         title: "DOCUMENTS",
         href: "documents"
      }, {
         title: "PRICING",
         href: "pricing"
      }, {
         title: "COMPANY",
         href: "company"
      }, {
         title: "HELP",
         href: "help"
      }
   ];
   constructor(private authService: AuthService, public dialog: MatDialog) { }

   ngOnInit() {
      this.userAuthInfo$ = this.authService.userInfo;
   }

   toggleSidebarCollapse(): void {
      this.toggleSideBar.emit();
   }

   ngOnDestroy() {
   }

   getUserEmail() {
      return this.authService.getUserEmail();
   }

   getFullName() {
      return this.authService.getFullName();
   }

   doLogin() {
      const config = new MatDialogConfig();
      config.disableClose = true;
      config.autoFocus = true;
      const dialogRef = this.dialog.open(LoginComponent, config);
      dialogRef.afterClosed().subscribe((result: LoginResult) => {
         switch (result) {
            case LoginResult.Success: {
               // do nothing
               break;
            }

            case LoginResult.ForgotPassword: {
               this.doForgotPassword();
            }
         }

      });
   }

   doSignup() {
      const config = new MatDialogConfig();
      config.disableClose = true;
      config.autoFocus = true;
      const dialogRef = this.dialog.open(SignupComponent, config);
      dialogRef.afterClosed().subscribe(result => {
         console.log("Signup Dialog Closed: " + result);
      });
   }

   doForgotPassword() {
      const config = new MatDialogConfig();
      config.disableClose = true;
      config.autoFocus = true;
      const dialogRef = this.dialog.open(ForgotPasswordComponent, config);
      dialogRef.afterClosed().subscribe(result => {
         console.log("ForgotPassword Dialog Closed: " + result);
      });
   }
}
