import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsecasesComponent } from './usecases.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
   declarations: [UsecasesComponent],
   imports: [
      CommonModule,
      FlexLayoutModule,
      RouterModule.forChild([
         { path: '', component: UsecasesComponent }
      ])
   ]
})
export class UsecasesModule { }
