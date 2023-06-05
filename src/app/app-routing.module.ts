import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplianceCreateComponent } from './components/appliance-create/appliance-create.component';
import { ApplianceDetailsComponent } from './components/appliance-details/appliance-details.component';
import { AppliancesOverviewComponent } from './components/appliances-overview/appliances-overview.component';
import { HomeComponent } from './components/home/home.component';
import {ApplianceUpdateComponent} from "./components/appliance-update/appliance-update.component";

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'appliances', component: AppliancesOverviewComponent },
  { path: 'appliances/create', component: ApplianceCreateComponent },
  { path: 'appliances/update/:id', component: ApplianceUpdateComponent },
  { path: 'appliances/:id', component: ApplianceDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
