import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './shared/ng-material-module.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './core/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NavigationModule } from './navigation/navigation.module';
import { AuthService } from './auth/auth.service';
import { SplashComponent } from './core/splash/splash.component';
import { HttpClientModule } from '@angular/common/http';

import { UsecasesModule } from './app-features/usecases/usecases.module';
import { DocumentsModule } from './app-features/documents/documents.module';
import { PricingModule } from './app-features/pricing/pricing.module';
import { CompanyModule } from './app-features/company/company.module';
import { HelpModule } from './app-features/help/help.module';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { SideBarMenu } from './navigation/sidenav/sidebar.model';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { VerifySmsComponent } from './auth/verify-sms/verify-sms.component';
import { LoginComponent } from './auth/login/login.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';


@NgModule({
   declarations: [
      AppComponent,
      SignupComponent,
      HomeComponent,
      ForgotPasswordComponent,
      SplashComponent,
      VerifyEmailComponent,
      NotfoundComponent,
      VerifySmsComponent,
      LoginComponent
   ],
   imports: [
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      NgMaterialModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      StorageServiceModule,
      HttpClientModule,
      RecaptchaModule,
      NavigationModule,
      UsecasesModule,
      DocumentsModule,
      PricingModule,
      CompanyModule,
      HelpModule
   ],

   entryComponents: [
      LoginComponent,
      SignupComponent
   ],
   providers: [
      AuthService,
      SideBarMenu,
      { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
