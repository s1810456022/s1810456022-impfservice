import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CanManageVaceventsGuard } from './shared/can-manage-vacevents.guard';
import { VaceventDetailsFormComponent } from './vacevent-details-form/vacevent-details-form.component';
import { VaceventDetailsComponent } from './vacevent-details/vacevent-details.component';
import { VaceventStateComponent } from './vacevent-state/vacevent-state.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:"full"},
  {path:'home', component: HomeComponent},
  {path:'vaccinationevents/:state', component: VaceventStateComponent},
  {path:'vaccinationevents/:state/:id', component: VaceventDetailsComponent, canActivate:[CanManageVaceventsGuard]},
  {path:'vaccinationevents/:state/new/create', component: VaceventDetailsFormComponent, canActivate:[CanManageVaceventsGuard]},
  {path:'login', component: LoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanManageVaceventsGuard]
})
export class AppRoutingModule { }