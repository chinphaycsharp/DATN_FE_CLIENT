import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  async send(email:string){
    var result = await this.authService.forgotPassword(email);
    console.log(result);
    if(result["body"]["statusCode"] == 200){
      this.router.navigate(['auth']);
    }
    else{
      console.log(result["body"]["message"]);
    }
  }
}
