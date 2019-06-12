import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from 'src/app/shared/ng-material-module.module';

import { SideBarLinkComponent } from './sidenav/side-bar-link.component';
import { SideBarComponent } from './sidenav/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import { TopnavComponent } from './topnav/topnav.component';

const routes: Routes = [];

@NgModule({
   declarations: [
      SideBarLinkComponent,
      SideBarComponent,
      FooterComponent,
      LogoComponent,
      TopnavComponent
   ],
   imports: [
      CommonModule,
      NgMaterialModule,
      FlexLayoutModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes)
   ],
   exports: [
      RouterModule,
      SideBarLinkComponent,
      SideBarComponent,
      FooterComponent,
      TopnavComponent
   ]
})
export class NavigationModule { }
