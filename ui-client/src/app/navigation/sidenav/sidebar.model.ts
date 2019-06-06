export interface SidebarNavLink {
   title: string;
   icon: string;
   iconStyle?: string;
   route?: string;
   separator?: boolean;
   isSubpanel?: boolean;
   subPanels?: SidebarNavLink[];
}

export interface SidebarNavGroup {
   panels: SidebarNavLink[];
}

export class SideBarMenu {
   private sideNav: SidebarNavGroup[] = [
      {
         panels: [
            {
               title: "Dashboard",
               icon: "home",
               route: "/dashboard"
            },
            {
               title: "Programmable SMS",
               icon: "chat_bubble_outline",
               route: "/noroute"
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
         panels: [
            {
               title: "Notifications",
               icon: "notifications"
            },
            {
               title: "Settings",
               icon: "settings"
            },
            {
               title: "API Docs",
               icon: "description"
            },
            {
               title: "Help",
               icon: "help_outline"
            }
         ]
      }
   ];

   getSideNav() {
      return (this.sideNav.slice());
   }
}