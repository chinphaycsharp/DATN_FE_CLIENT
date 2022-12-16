import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResult } from 'src/app/models/base/ApiResult';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:1938/api/active';
  constructor(private http: HttpClient) { }

  getCategories(type:string): Promise<ApiResult>{
    let params = new HttpParams({
      fromObject:{
        ItemsPerPage : "100",
        FilterText:"",
        type : type,
        Page : 1
      }
    });
    return this.http.get<ApiResult>(this.baseUrl+"/getcategories",{params:params}).toPromise();
  }
}
