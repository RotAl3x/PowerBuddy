import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginatedListResponse} from "../Models/paginated-list-response.model";
import {Appliance} from "../Models/appliance.model";
import {environment} from "../../environments/environment";
import {ApplianceCategory} from "../Models/appliance-category.model";

@Injectable({
  providedIn: 'root'
})
export class ApplianceCategoryService {
  private baseURL:string="applianceCategory";
  constructor(private httpClient:HttpClient) { }

  public getApplianceCategory(): Observable<ApplianceCategory[]>{
    return this.httpClient.get<ApplianceCategory[]>(`${environment.apiUrl}${this.baseURL}`);
  }


  public getCategory(id:number): Observable<ApplianceCategory>{
    return this.httpClient.get<ApplianceCategory>(`${environment.apiUrl}${this.baseURL}/${id}`);
  }
}
