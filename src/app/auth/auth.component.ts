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
  isLoading = false;
  public model : loginResultModel = null;
  public notification : boolean = true;
  public notificationRegister : boolean = true;
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
    this.notification= true;
    this.validationFormLogin(username,password);
    if(this.notification){
      this.isLoading = true;
      debugger;
      this.authService.login(username,password).then(result=>{
        if(result.statusCode == 200){
          this.model = JSON.parse(result["resultObj"]);
          localStorage.setItem('accessToken', this.model.access_token);
          localStorage.setItem('expriesDate',this.model.expires);
          localStorage.setItem('currentDate',this.model.now);
          localStorage.setItem('privileges',this.model.privileges.toString());
          localStorage.setItem('userId',this.model.userId.toString());
          localStorage.setItem('isLogin' ,'true');
          this.isLoading = false;
          this.router.navigate(['home']);
        }
        else {
          console.log(result["message"]);
        }
      });
      if(this.isLoading){
        this.isLoading = false;
        this.router.navigate(['auth']);
      }
    }
    else{
      console.log("Bạn không được để trống các trường");
    }
  }

  async register(name:string,username:string, email : string ,phone : string ,password : string,confirmpass : string){
    this.notificationRegister= true;
    this.validationFormRegister(name,username,email,phone,password,confirmpass);
    if(this.notificationRegister){
      var roleId = ["8"];
      var model = new registerViewModel(1,1,username,password,confirmpass,1,name,email,phone,roleId);
      this.isLoading = true;
      this.authService.register(model).then(result=>{
        if(result["body"]["statusCode"] == 201){
          console.log("Đăng ký thành công hãy đăng nhập ngay");
          var a = document.querySelector('.cont');
          a?.classList.toggle('s--signup');
        }
        console.log(result);
      });
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
      this.notificationRegister = false;
    }
    if(username == '')
    {
      this.propertiesRegister['username'] = false;
      this.notificationRegister = false;
    }
    if(email == '')
    {
      this.propertiesRegister['email'] = false;
      this.notificationRegister = false;
    }
    if(phone == '')
    {
      this.propertiesRegister['username'] = false;
      this.notificationRegister = false;
    }
    if(password == '')
    {
      this.propertiesRegister['password'] = false;
      this.notificationRegister = false;
    }
    if(confirmpass == '')
    {
      this.propertiesRegister['confirmpass'] = false;
      this.notificationRegister = false;
    }

    //validate pass
    if(password != "" && confirmpass != ""){
      if(password != confirmpass){
        this.pass['confirmpass'] = false;
        this.notificationRegister = false;
      }
    }
  }
}
