import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AuthGuard } from './auth/auth.guard';
import { SplashComponent } from './core/splash/splash.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { VerifySmsComponent } from './auth/verify-sms/verify-sms.component';

const routes: Routes = [
   { path: '', component: HomeComponent, canActivate: [AuthGuard] },
   { path: '404', component: NotfoundComponent },
   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
   { path: 'verifyemail', component: VerifyEmailComponent },
   { path: 'verifysms', component: VerifySmsComponent },
   { path: 'forgot', component: ForgotPasswordComponent },
   { path: 'analytics', canActivate: [AuthGuard], loadChildren: './app-features/analytics/analytics.module#AnalyticsModule' },
   { path: 'messagelog', canActivate: [AuthGuard], loadChildren: './app-features/messagelog/messagelog.module#MessagelogModule' },
   { path: 'usecases', loadChildren: './app-features/usecases/usecases.module#UsecasesModule' },
   { path: 'documents', loadChildren: './app-features/documents/documents.module#DocumentsModule' },
   { path: 'pricing', loadChildren: './app-features/pricing/pricing.module#PricingModule' },
   { path: 'company', loadChildren: './app-features/company/company.module#CompanyModule' },
   { path: 'help', loadChildren: './app-features/help/help.module#HelpModule' },

   { path: '', component: SplashComponent },
   { path: '**', redirectTo: '/404', pathMatch: 'full' }
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
