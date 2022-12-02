import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginModel } from 'src/app/models/auth/loginModel';
import { loginResultModel } from 'src/app/models/auth/loginResultModel';
import { registerViewModel } from 'src/app/models/auth/registerViewModel';
import { ApiResult } from 'src/app/models/base/ApiResult';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:1938/api/token';
  constructor(private http: HttpClient) { }

  login(username : string,password : string ) : Promise<ApiResult>{
    var model = new loginModel();
    model.username = username;
    model.password = password;
    model.grant_type = "password";
    model.client_id = "EPS";
    model.client_secret = "b0udcdl8k80cqiyt63uq";
    return this.http.post<ApiResult>(this.baseUrl + "/auth",model).toPromise();
  }

  register(model : registerViewModel) :Promise<ApiResult>{
    var formData: any = new FormData();
    formData.append('compId', 1);
    formData.append('status', 1);
    formData.append('username', model.username);
    formData.append('status', model.status);
    formData.append('password', model.password);
    formData.append('passwordConfirmation', model.passwordConfirmation);
    formData.append('unitId', model.unitId);
    formData.append('fullName', model.fullName);
    formData.append('email', model.email);
    formData.append('PhoneNumber', model.PhoneNumber);
    formData.append('roleIds', model.roleIds);

    return this.http.post<ApiResult>(this.baseUrl +"/register", formData,{reportProgress:true,observe:"response" as "body"}).toPromise();
  }

  forgotPassword(email:string){
    var model = {
      email
    };

    return this.http.put<ApiResult>(this.baseUrl +"/forgotpassword",model ,{reportProgress:true,observe:"response" as "body"}).toPromise();
  }
}
