import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginatedListResponse} from "../Models/paginated-list-response.model";
import {Appliance} from "../Models/appliance.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApplianceService {

  private baseURL:string="appliance";
  constructor(private httpClient:HttpClient) { }

  public getAppliances(offset: number,pageSize: number, sortField: string, sortDir: string): Observable<PaginatedListResponse<Appliance>>{
    return this.httpClient.get<PaginatedListResponse<Appliance>>(`${environment.apiUrl}${this.baseURL}`);
  }

  public getAppliance(id:number): Observable<Appliance>{
    return this.httpClient.get<Appliance>(`${environment.apiUrl}${this.baseURL}/${id}`);
  }
}
