import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarNavLink } from './side-bar-link.component';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';


interface SidebarNavGroup {
   heading: string;
   panels: SidebarNavLink[];
}

@Component({
   selector: 'app-sidebar',
   templateUrl: './sidebar.component.html',
   styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
   activePanel: string;
   isLoggedIn$: Observable<boolean>;

   private sideNav: SidebarNavGroup[] = [
      {
         heading: "Services",
         panels: [
            {
               title: "Dashboard",
               icon: "home",
               iconStyle: "outlined",
               route: "/dashboard"
            },
            {
               title: "Programmable SMS",
               icon: "chat_bubble_outline",
               route: "/messagelog"
            },
            {
               title: "Authenticate",
               icon: "security",
               route: "/authenticate"
            },
            {
               title: "Validate",
               icon: "security",
               route: "/vadlidate"
            },
            {
               title: "Numbers",
               icon: "thumb_up_alt",
               route: "/numbers"
            },
            {
               title: "Message Log",
               icon: "message",
               route: "/messagelog"
            },
            {
               title: "Analytics",
               icon: "trending_up",
               route: "/analytics",
               subPanels: [
                  {
                     title: "tmp1", icon: "", isSubpanel: true
                  }
               ]
            }
         ]
      },
      {
         heading: "Account",
         panels: [
            {
               title: "Notifications",
               icon: "notifications",
               iconStyle: "outlined",
            },
            {
               title: "Settings",
               icon: "settings",
               iconStyle: "outlined",
            },
            {
               title: "API Docs",
               icon: "description",
               iconStyle: "outlined",
            },
            {
               title: "Help",
               icon: "help_outline",
               iconStyle: "outlined"
            }
         ]
      }
   ];

   constructor(private authService: AuthService) { }

   ngOnInit() {
      this.isLoggedIn$ = this.authService.isLoggedIn;
   }


   ngOnDestroy() {

   }

   logOut() {
   }
}