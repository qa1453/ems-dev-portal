import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DocumentsComponent } from './documents.component';


@NgModule({
   declarations: [DocumentsComponent],
   imports: [
      CommonModule,
      FlexLayoutModule,
      RouterModule.forChild([
         { path: '', component: DocumentsComponent }
      ])
   ]
})
export class DocumentsModule { }
