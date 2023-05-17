import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from "@angular/material/list";
import { HomeComponent } from './components/home/home.component';
import { AppliancesOverviewComponent } from './components/appliances-overview/appliances-overview.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SecurityInterceptor} from "./interceptors/security.interceptor";
import { ApplianceDetailsComponent } from './components/appliance-details/appliance-details.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";

const MaterialModules = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatTableModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppliancesOverviewComponent,
    ApplianceDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi:true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
