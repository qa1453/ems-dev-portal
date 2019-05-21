import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './shared/ng-material-module.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { FooterComponent } from './core/footer/footer.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';


@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      SidebarComponent,
      FooterComponent,
      SignupComponent,
      HomeComponent,
      LoginComponent,
      ForgotPasswordComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      NgMaterialModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      RecaptchaModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
