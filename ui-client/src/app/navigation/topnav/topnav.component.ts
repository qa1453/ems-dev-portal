import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthStates, UserAuthInfo } from 'src/app/auth/authstates.enum';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginDialogComponent } from 'src/app/auth/login-dialog/login-dialog.component';

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
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      const dialogRef = this.dialog.open(LoginDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
         console.log("Login Dialog Closed: " + result);
      });
   }
}
