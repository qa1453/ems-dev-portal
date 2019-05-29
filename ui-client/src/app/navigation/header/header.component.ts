import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';



@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

   @Output() toggleSidebar = new EventEmitter<void>();
   isLoggedIn$: Observable<boolean>;


   constructor(private authService: AuthService) { }

   ngOnInit() {
      this.isLoggedIn$ = this.authService.isLoggedIn;
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