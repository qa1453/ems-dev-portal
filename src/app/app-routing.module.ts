import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { SignupComponent } from './core/signup/signup.component';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'home', component: HomeComponent },
   { path: 'signup', component: SignupComponent },
   { path: 'login', component: LoginComponent },
   { path: 'analytics', loadChildren: './app-features/analytics/analytics.module#AnalyticsModule'}
];

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      RouterModule.forRoot(routes)
   ],
   exports: [RouterModule],
   providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
