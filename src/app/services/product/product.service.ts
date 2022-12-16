import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResult } from 'src/app/models/base/ApiResult';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:1938/api/active';
  constructor(private http: HttpClient) { }

  getTopProducts(): Promise<ApiResult>{
    return this.http.get<ApiResult>(this.baseUrl + "/getproduct").toPromise();
  }

  getProductByType(SortBy:string,SortDesc:any,type:string,name:string): Promise<ApiResult>{
    let params = new HttpParams({
      fromObject:{
        SortBy:SortBy,
        SortDesc:SortDesc,
        ItemsPerPage : "10",
        name:name,
        type : type,
        Page : 1
      }
    });
    return this.http.get<ApiResult>(this.baseUrl,{params:params}).toPromise();
  }

  getProduct( SortBy:string,SortDesc:any,categoryId:any,type:string): Promise<ApiResult>{
    let params = new HttpParams({
      fromObject:{
        SortBy:SortBy,
        SortDesc:SortDesc,
        FilterText:"",
        categoryId:categoryId,
        ItemsPerPage : "10",
        Page : 1
      }
    });
    let url = "";
    if(type == "TREE"){
      url = this.baseUrl+"/gettree";
    }
    if(type == "TOOL"){
      url = this.baseUrl+"/gettool";
    }
    if(type == "POT"){
      url = this.baseUrl+"/getpot";
    }
    if(type == "POST"){
      url = this.baseUrl+"/getpost";
    }
    return this.http.get<ApiResult>(url,{params:params}).toPromise();
  }
}
