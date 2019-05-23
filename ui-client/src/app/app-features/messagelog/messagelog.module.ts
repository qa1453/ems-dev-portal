import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MessagelogComponent } from './messagelog.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
   declarations: [MessagelogComponent],
   imports: [
      CommonModule,
      RouterModule.forChild([
         { path: '', component: MessagelogComponent }
      ]),
      MatTableModule,
      MatPaginatorModule,
      MatSortModule
   ]
})
export class MessagelogModule { }
