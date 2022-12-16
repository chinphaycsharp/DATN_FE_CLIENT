import { Component, OnInit } from '@angular/core';
import { ChangePasswordDto } from 'src/app/models/personal/ChangePasswordDto';
import { UpdateInformationViewModel } from 'src/app/models/personal/UpdateInformationViewModel';
import { UserDetailViewModel } from 'src/app/models/personal/UserDetailViewModel';
import { PersonalService } from 'src/app/services/personal/personal.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  public isLoading =false;
  id:any;
  accessToken : string;
  public properties : any = {
    name:true,
    email:true,
    username : true,
    phone: true,
    address: true
  };

  public lengths : any = {
    name:true,
    email:true,
    username : true,
    phone: true,
    address: true
  };

  public propertiesRegister : any = {
    username:true,
    email:true,
    phone : true,
    password : true,
    confirmpass : true
  };
  img:string;
  user:UserDetailViewModel;
  public notification : boolean = true;
  constructor(private personalService:PersonalService) {
    this.accessToken = localStorage.getItem("accessToken");
    this.id = localStorage.getItem("userId");
    console.log(this.id);
  }

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById(){
    this.isLoading = true;
    this.personalService.getUserById(this.id,this.accessToken).then(result=>{
      this.user = result["body"]["resultObj"];
      console.log(this.user);
      this.img = this.user.backgroundImage;
      this.isLoading = false;
    })
  }

  upload(e:any){
    var file = e.target.files[0];
    console.log(file);
    const blobURL = URL.createObjectURL(file);
    (document.getElementById('upload') as HTMLImageElement).src = blobURL;
  }

  updateInformation(name:string,email : string,phone: string,address: string){
    this.notification = true;
    this.validationForm(name,email,phone,address);
    if(this.notification){
      var roleIds = ["8"];
      var model = new UpdateInformationViewModel(this.id,name,1,email,phone, roleIds,address);
      if(this.accessToken){
        this.isLoading = true;
        this.personalService.updateInformation(this.accessToken,this.id,model).then(result=>{
          console.log(result);
          this.isLoading =false;
        })
      }
    }
    //this.personalService.updateInformation(this.accessToken,this.id,)
  }

  validationForm(name:any,email:any,username : any,phone:any)
  {
    if(name == '')
    {
      this.properties['name'] = false;
      this.notification = false;
    }
    if(email == '')
    {
      this.properties['email'] = false;
      this.notification = false;
    }
    if(username == '')
    {
      this.properties['address'] = false;
      this.notification = false;
    }
    if(phone == '')
    {
      this.properties['phone'] = false;
      this.notification = false;
    }

    //validate length
    if(name != '' && name.length < 6){
      this.lengths['name'] = false;
    }
    if(email != '' && name.length < 6){
      this.lengths['email'] = false;
    }
    if(username != '' && name.length < 6){
      this.lengths['address'] = false;
    }
    if(phone != '' && name.length < 6){
      this.lengths['phone'] = false;
    }
  }

  validatePassword(newPassword:string,confirmPassword:string)
  {
    if(newPassword != confirmPassword){
      console.log("Mật khẩu không khớp !");
      this.notification = false;
    }
  }

  save(oldNewPassword:string,newPassword:string,confirmPassword:string){
    this.notification = true;
    this.validatePassword(newPassword,confirmPassword);
    if(this.notification){
      this.isLoading = true;
      var model = new ChangePasswordDto(oldNewPassword,newPassword,confirmPassword);
      this.personalService.changePassword(model, this.accessToken).then(result=>{
        console.log(result);
        this.isLoading = false;
        console.log(this.isLoading);
      });
    }
  }
}
