import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from 'src/app/shared/ng-material-module.module';

import { SideBarLinkComponent } from './sidenav/side-bar-link.component';
import { SideBarComponent } from './sidenav/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './logo/logo.component';

const routes: Routes = [];

@NgModule({
   declarations: [
      SideBarLinkComponent,
      SideBarComponent,
      HeaderComponent,
      FooterComponent,
      LogoComponent
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
      HeaderComponent,
      FooterComponent
   ]
})
export class NavigationModule { }
