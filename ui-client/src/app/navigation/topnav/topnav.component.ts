import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { UserAccountStates, UserSessionInfo } from 'src/app/auth/user-session-info';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { LoginResult } from 'src/app/auth/login/login-interface';
import { ForgotPasswordComponent } from '../../auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../auth/verify-email/verify-email.component';
import { VerifySmsComponent } from 'src/app/auth/verify-sms/verify-sms.component';

@Component({
   selector: 'app-topnav',
   templateUrl: './topnav.component.html',
   styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
   @Output() toggleSideBar = new EventEmitter<void>();
   UserAccountStates = UserAccountStates;
   userSessionInfo$: Observable<UserSessionInfo>;

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
   constructor(
      public authService: AuthService,
      public dialog: MatDialog
   ) { }

   ngOnInit() {
      this.userSessionInfo$ = this.authService.userInfoAsObservable;
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
      let signupRef = this.dialog.open(SignupComponent);
      signupRef.afterClosed().subscribe(result => {
         switch (result) {
            case true:
               // display the next dialog box for email verfication.
               let emailRef = this.dialog.open(VerifyEmailComponent);
               emailRef.afterClosed().subscribe(result => {
                  // we shouldn't be here unless success
                  let smsRef = this.dialog.open(VerifySmsComponent);
                  smsRef.afterClosed().subscribe(result => {
                     console.log("returned from VerifySmsComponent");
                  });
               })
               break;

            case false: // do nothing;
            default:
               break;
         }
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
