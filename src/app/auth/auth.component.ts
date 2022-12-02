import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginResultModel } from '../models/auth/loginResultModel';
import { registerViewModel } from '../models/auth/registerViewModel';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public model : loginResultModel = null;
  public notification : boolean = true;
  public propertiesLogin : any = {
    username:true,
    password:true,
  };

  public propertiesRegister : any = {
    username:true,
    email:true,
    phone : true,
    password : true,
    confirmpass : true
  };

  public pass : any = {
    confirmpass: true
  };

  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  changeTab(){
    var a = document.querySelector('.cont');
    a?.classList.toggle('s--signup');
  }

  async login(username:string, password:string){
    this.validationFormLogin(username,password);
    if(this.notification){
      var result = await this.authService.login(username,password);
      if(result.statusCode == 200){
        this.model = JSON.parse(result["resultObj"]);
        console.log(this.model);
        localStorage.setItem('accessToken', this.model.access_token);
        localStorage.setItem('expriesDate',this.model.expires);
        localStorage.setItem('currentDate',this.model.now);
        localStorage.setItem('privileges',this.model.privileges.toString());
        localStorage.setItem('isLogin' ,'true');
        this.router.navigate(['home']);
      }
      else {
        console.log(result["message"]);
      }
    }
    else{
      console.log("Bạn không được để trống các trường");
    }
  }

  async register(name:string,username:string, email : string ,phone : string ,password : string,confirmpass : string){
    this.validationFormRegister(name,username,email,phone,password,confirmpass);
    if(this.notification){
      debugger;
      var roleId = ["8"];
      var model = new registerViewModel(1,1,username,password,confirmpass,1,name,email,phone,roleId);
      var result = await this.authService.register(model);
      if(result["body"]["statusCode"] == 201){
        console.log("Đăng ký thành công hãy đăng nhập ngay");
        var a = document.querySelector('.cont');
        a?.classList.toggle('s--signup');
      }
      console.log(result);
    }
  }

  validationFormLogin(username:any,password:any)
  {
    if(username == '')
    {
      this.propertiesLogin['username'] = false;
      this.notification = false;
    }
    if(password == '')
    {
      this.propertiesLogin['password'] = false;
      this.notification = false;
    }
  }

  validationFormRegister(name:string,username:string, email : string ,phone : string ,password : string,confirmpass : string)
  {
    if(name == '')
    {
      this.propertiesRegister['name'] = false;
      this.notification = false;
    }
    if(username == '')
    {
      this.propertiesRegister['username'] = false;
      this.notification = false;
    }
    if(email == '')
    {
      this.propertiesRegister['email'] = false;
      this.notification = false;
    }
    if(phone == '')
    {
      this.propertiesRegister['username'] = false;
      this.notification = false;
    }
    if(password == '')
    {
      this.propertiesRegister['password'] = false;
      this.notification = false;
    }
    if(confirmpass == '')
    {
      this.propertiesRegister['confirmpass'] = false;
      this.notification = false;
    }

    //validate pass
    if(password != "" && confirmpass != ""){
      if(password != confirmpass){
        this.pass['confirmpass'] = false;
      }
    }
  }
}
