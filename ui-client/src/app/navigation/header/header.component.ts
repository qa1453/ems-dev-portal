import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthStates, UserAuthInfo } from 'src/app/auth/authstates.enum';
import { Observable } from 'rxjs';



@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

   @Output() toggleSidebar = new EventEmitter<void>();
   AuthStates = AuthStates;
   userAuthInfo$: Observable<UserAuthInfo>;


   constructor(private authService: AuthService) {
   }

   ngOnInit() {
      this.userAuthInfo$ = this.authService.userInfo;
   }

   toggleSidebarCollapse(): void {
      this.toggleSidebar.emit();
   }

   ngOnDestroy() {
   }

   getUserEmail() {
      return this.authService.getUserEmail();
   }
}