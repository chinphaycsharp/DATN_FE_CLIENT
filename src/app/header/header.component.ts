import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { cartItemViewModel } from '../models/cart/cartItemViewModel';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnChanges {
  isLogin :boolean = false;
  length = 0;
  cartItemViewModels :cartItemViewModel[] = [];
  constructor(private router: Router,public cartService:CartService) {
    this.isLogin = localStorage.getItem("isLogin") == "true" ? true : false ;
  }

  ngOnInit(): void {
    this.loadLengthCart();
  }

  loadLengthCart(){
    this.cartService.getProducts()
    .subscribe(res=>{
      this.length = 0;
      console.log(JSON.parse(sessionStorage.getItem("cart_items")));
      if(JSON.parse(sessionStorage.getItem("cart_items"))){
        let l = JSON.parse(sessionStorage.getItem("cart_items")).length;
        let products = JSON.parse(sessionStorage.getItem("cart_items"));
        if(l > 1){
          for (let index = 0; index < products.length; index++) {
              this.length += products[index].amount;
          }
        }
        else{
          this.length = products[0].amount;
        }
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
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


  searchProduct(searchStr : string){
    console.log(searchStr);
    this.router.navigate(['/search/product',searchStr]);
  }
}
