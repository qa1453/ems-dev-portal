import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { UsersService } from 'src/app/shared/services/users.service';

@NgModule({
   declarations: [
      AppComponent,
      SignupComponent,
      HomeComponent,
      LoginComponent,
      ForgotPasswordComponent,
      HeaderComponent,
      SidenavComponent,
      FooterComponent
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
   providers: [UsersService],
   bootstrap: [AppComponent]
})
export class AppModule { }
