import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResult } from 'src/app/models/base/ApiResult';
import { ChangePasswordDto } from 'src/app/models/personal/ChangePasswordDto';
import { UpdateInformationViewModel } from 'src/app/models/personal/UpdateInformationViewModel';
import { UserDetailViewModel } from 'src/app/models/personal/UserDetailViewModel';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private baseUrl = 'http://localhost:1938/api/users';
  constructor(private http: HttpClient) { }

  updateInformation(accessToken:string,id: number, model : UpdateInformationViewModel): Promise<ApiResult>{
    var formData: any = new FormData();
    formData.append('Id', model.Id);
    formData.append('fullName',model.fullName);
    formData.append('UnitId',1);
    formData.append('email', model.email);
    formData.append('phoneNumber', model.phoneNumber);
    formData.append('roleIds', model.roleIds);
    formData.append('Address', model.Address);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.put<ApiResult>(this.baseUrl + `/${id}`,formData,{headers:headers,observe:"response" as "body"}).toPromise();
  }

  getUserById(id: number, accessToken : string) :Promise<UserDetailViewModel>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get<UserDetailViewModel>(this.baseUrl + `/${id}` ,{headers:headers,observe:"response" as "body"}).toPromise();
  }

  changePassword(model:ChangePasswordDto,accessToken : string) :Promise<ApiResult>{
    var formData: any = new FormData();
    formData.append('OldPassword', model.OldPassword);
    formData.append('NewPassword',model.NewPassword);
    formData.append('NewPasswordConfirm',model.NewPasswordConfirm);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.put<ApiResult>(this.baseUrl,formData,{headers:headers,observe:"response" as "body"}).toPromise();
  }
}
