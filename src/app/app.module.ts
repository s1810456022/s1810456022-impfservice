import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HomeComponent } from './home/home.component';
import { VaccinationService } from './shared/vaccination.service';
import { UserService } from './shared/user.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { VaceventStateComponent } from './vacevent-state/vacevent-state.component';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule ],
  declarations: [ AppComponent, HomeComponent, VaceventStateComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ VaccinationService, UserService]
})
export class AppModule { }
