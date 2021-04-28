import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './shared/user.service';
import { AppRoutingModule } from './app-routing.module';
import { VaceventStateComponent } from './vacevent-state/vacevent-state.component';
import { VaceventStateItemComponent } from './vacevent-state-item/vacevent-state-item.component';
import { VaceventListComponent } from './vacevent-list/vacevent-list.component';
import { VaceventService } from './shared/vacevent.service';
import { VaceventDetailsComponent } from './vacevent-details/vacevent-details.component';
import { VaceventDetailsFormComponent } from './vacevent-details-form/vacevent-details-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";
import { DatePipe} from '@angular/common';
import { VaclocationService } from './shared/vaclocation.service';
import {MomentModule} from 'ngx-moment';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './shared/authentication.service';
import { TokenInterceptorService } from './shared/token-interceptor.service';
import { JwtInterceptorService } from './shared/jwt.interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, ToastrModule.forRoot(), MomentModule ],
  declarations: [ AppComponent, HomeComponent, VaceventStateComponent, VaceventStateItemComponent, VaceventListComponent, VaceventDetailsComponent, VaceventDetailsFormComponent, LoginComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ UserService, VaceventService, DatePipe, VaclocationService, AuthenticationService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  {
    provide:HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true
  }
  ]
})
export class AppModule { }
