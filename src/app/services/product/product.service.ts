import { HttpClient } from '@angular/common/http';
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
}
