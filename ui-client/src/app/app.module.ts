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
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NavigationModule } from './navigation/navigation.module';
import { AuthService } from './auth/auth.service';
import { SplashComponent } from './core/splash/splash.component';

import { UsecasesModule } from './app-features/usecases/usecases.module';
import { DocumentsModule } from './app-features/documents/documents.module';
import { PricingModule } from './app-features/pricing/pricing.module';
import { CompanyModule } from './app-features/company/company.module';
import { HelpModule } from './app-features/help/help.module';


@NgModule({
   declarations: [
      AppComponent,
      SignupComponent,
      HomeComponent,
      LoginComponent,
      ForgotPasswordComponent,
      SplashComponent
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
      RecaptchaModule,
      NavigationModule,
      UsecasesModule,
      DocumentsModule,
      PricingModule,
      CompanyModule,
      HelpModule
   ],
   providers: [AuthService],
   bootstrap: [AppComponent]
})
export class AppModule { }
