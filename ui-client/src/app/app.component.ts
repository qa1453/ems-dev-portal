import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { AuthStates, UserAuthInfo } from './auth/authstates.enum';
import { Subscription, Observable } from 'rxjs';


@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

   // Because the drawer element is not created when the user is not logged in,
   // I need to make it a Viewchild to delay refering to the drawer until it is rendered 
   // When the user is logged in.
   @ViewChild('drawer') drawer;

   AuthStates = AuthStates;
   title = 'ems-devportal';
   userAuthInfo$: Observable<UserAuthInfo>;


   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
         map(result => result.matches)
      );

   constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {
   }

   ngOnInit() {
      this.userAuthInfo$ = this.authService.userInfo;
   }

   ngOnDestroy() {
   }

   toggleDrawer(element: any) {
      element.toggle();
   }
}
