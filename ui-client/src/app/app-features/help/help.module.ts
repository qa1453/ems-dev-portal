import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HelpComponent } from './help.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
   declarations: [HelpComponent],
   imports: [
      CommonModule,
      FlexLayoutModule,
      RouterModule.forChild([
         { path: '', component: HelpComponent }
      ])
   ]
})
export class HelpModule { }
