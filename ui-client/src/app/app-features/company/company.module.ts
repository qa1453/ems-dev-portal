import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
   declarations: [CompanyComponent],
   imports: [
      CommonModule,
      FlexLayoutModule,
      RouterModule.forChild([
         { path: '', component: CompanyComponent }
      ])
   ]
})
export class CompanyModule { }
