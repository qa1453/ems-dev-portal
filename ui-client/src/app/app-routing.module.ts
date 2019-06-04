import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AuthGuard } from './auth/auth.guard';
import { SplashComponent } from './core/splash/splash.component';

const routes: Routes = [
   { path: '', component: HomeComponent, canActivate: [AuthGuard] },
   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
   { path: 'signup', component: SignupComponent },
   { path: 'login', component: LoginComponent },
   { path: 'forgot', component: ForgotPasswordComponent },
   { path: 'analytics', canActivate: [AuthGuard], loadChildren: './app-features/analytics/analytics.module#AnalyticsModule' },
   { path: 'messagelog', canActivate: [AuthGuard], loadChildren: './app-features/messagelog/messagelog.module#MessagelogModule' },
   { path: 'usecases', loadChildren: './app-features/usecases/usecases.module#UsecasesModule' },
   { path: 'documents', loadChildren: './app-features/documents/documents.module#DocumentsModule' },
   { path: 'pricing', loadChildren: './app-features/pricing/pricing.module#PricingModule' },
   { path: 'company', loadChildren: './app-features/company/company.module#CompanyModule' },
   { path: 'help', loadChildren: './app-features/help/help.module#HelpModule' },

   { path: '', component: SplashComponent },
   { path: '**', component: SplashComponent }
];

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      RouterModule.forRoot(routes)
   ],
   exports: [RouterModule]
})
export class AppRoutingModule { }

//, providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
