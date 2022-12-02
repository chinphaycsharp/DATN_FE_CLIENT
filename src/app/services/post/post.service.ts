import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResult } from 'src/app/models/base/ApiResult';
import { ListPostViewModel } from 'src/app/models/post/ListPostViewModel';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:1938/api/active';
  constructor(private http: HttpClient) { }

  getTopPosts(): Promise<ListPostViewModel>{
    return this.http.get<ListPostViewModel>(this.baseUrl + "/getTopPost").toPromise();
  }
}
