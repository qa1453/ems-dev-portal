import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgMaterialModule } from 'src/app/shared/ng-material-module.module';

import { SideBarLinkComponent } from './sidenav/side-bar-link.component';
import { SideBarComponent } from './sidenav/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [];

@NgModule({
   declarations: [
      SideBarLinkComponent,
      SideBarComponent,
      HeaderComponent,
      FooterComponent
   ],
   imports: [
      CommonModule,
      NgMaterialModule,
      RouterModule.forChild(routes)
   ],
   exports: [
      RouterModule,
      SideBarLinkComponent,
      SideBarComponent,
      HeaderComponent,
      FooterComponent
   ]
})
export class NavigationModule { }
