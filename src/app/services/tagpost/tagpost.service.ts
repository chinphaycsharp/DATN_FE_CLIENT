import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResult } from 'src/app/models/base/ApiResult';

@Injectable({
  providedIn: 'root'
})
export class TagpostService {
  private baseUrl = 'http://localhost:1938/api/active';
  constructor(private http: HttpClient) { }

  getTagPosts(): Promise<ApiResult>{
    let params = new HttpParams({
      fromObject:{
        ItemsPerPage : "100",
        FilterText:"",
        Page : 1
      }
    });
    return this.http.get<ApiResult>(this.baseUrl+"/gettagpost",{params:params}).toPromise();
  }
}
