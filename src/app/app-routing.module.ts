import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VaceventDetailsComponent } from './vacevent-details/vacevent-details.component';
import { VaceventListComponent } from './vacevent-list/vacevent-list.component';
import { VaceventStateComponent } from './vacevent-state/vacevent-state.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:"full"},
  {path:'home', component: HomeComponent},
  {path:'vaccinationevents', component: VaceventListComponent},
  {path:'vaccinationevents/:state', component: VaceventStateComponent},
  {path:'vaccinationevent/:id', component: VaceventDetailsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }