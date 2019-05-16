import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
       {path: '', component: AnalyticsComponent}
    ])
  ],
  declarations: [AnalyticsComponent]
})
export class AnalyticsModule { }
