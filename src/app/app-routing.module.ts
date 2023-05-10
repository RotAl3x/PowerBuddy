import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AppliancesOverviewComponent} from "./components/appliances-overview/appliances-overview.component";

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'appliances', component:AppliancesOverviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
