import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin :boolean = false;
  constructor(private router: Router) {
    this.isLogin = localStorage.getItem("isLogin") == "true" ? true : false ;
   }

  ngOnInit(): void {
  }

  openModal(){
    var a = document.getElementById("myModal") as HTMLElement;
    a.style.display = "block";
  }

  closeModal(){
    var a = document.getElementById("myModal") as HTMLElement;
    a.style.display = "none";
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    var a = document.getElementById("myModal") as HTMLElement;
    if (event.target == a) {
      a.style.display = "none";
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['auth']);
  }
}
