import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarNavLink } from './sidebar.model';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthStates, UserAuthInfo } from 'src/app/auth/authstates.enum';
import { Observable } from 'rxjs';
import { SidebarNavGroup, SideBarMenu } from './sidebar.model';


@Component({
   selector: 'app-sidebar',
   templateUrl: './sidebar.component.html',
   styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
   activePanel: string;
   AuthStates = AuthStates;
   userAuthInfo$: Observable<UserAuthInfo>;
   private sideNav: SidebarNavGroup[] = [];

   constructor(private authService: AuthService, private sideBarMenu: SideBarMenu) {
      this.sideNav = this.sideBarMenu.getSideNav();
   }

   ngOnInit() {
      this.userAuthInfo$ = this.authService.userInfo;
   }

   ngOnDestroy() {
   }
}