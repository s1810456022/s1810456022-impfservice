import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './shared/user.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, ToastrModule.forRoot() ],
  declarations: [ AppComponent, HomeComponent, VaceventStateComponent, VaceventStateItemComponent, VaceventListComponent, VaceventDetailsComponent, VaceventDetailsFormComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ UserService, VaceventService, DatePipe, VaclocationService]
})
export class AppModule { }
