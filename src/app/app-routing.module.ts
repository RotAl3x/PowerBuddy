import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AppliancesOverviewComponent} from "./components/appliances-overview/appliances-overview.component";
import {ApplianceDetailsComponent} from "./components/appliance-details/appliance-details.component";

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'appliances', component:AppliancesOverviewComponent},
  {path:'appliances/:id',component:ApplianceDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
