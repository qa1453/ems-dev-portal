import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {
   loggedIn = true;
   title = 'ems-devportal';


   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
         map(result => result.matches)
      );

   constructor(  /* private data: LogInStateService, */
      private breakpointObserver: BreakpointObserver) {

   }
}
