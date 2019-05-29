import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';


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

   loggedIn = true;
   title = 'ems-devportal';
   isLoggedIn$: Observable<boolean>;


   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
         map(result => result.matches)
      );

   constructor(
      private breakpointObserver: BreakpointObserver,
      private authService: AuthService) {
   }


   ngOnInit() {
      this.isLoggedIn$ = this.authService.isLoggedIn;
   }

   ngOnDestroy() {
   }

   toggleDrawer(element: any) {
      element.toggle();
   }
}
