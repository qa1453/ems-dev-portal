import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarNavLink } from './sidebar.model';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { UserAccountStates } from 'src/app/auth/user-session-info';
import { Observable } from 'rxjs';
import { SidebarNavGroup, SideBarMenu } from './sidebar.model';


@Component({
   selector: 'app-sidebar',
   templateUrl: './sidebar.component.html',
   styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
   activePanel: string;
   UserAccountStates = UserAccountStates; // a little trick to use enum values in the Template
   private sideNav: SidebarNavGroup[] = [];

   constructor(
      public authService: AuthService,
      private sideBarMenu: SideBarMenu) {
      this.sideNav = this.sideBarMenu.getSideNav();
   }

   ngOnInit() {
   }

   ngOnDestroy() {
   }
}