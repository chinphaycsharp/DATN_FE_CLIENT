import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    if(JSON.parse(sessionStorage.getItem("cart_items"))){
      let products = JSON.parse(sessionStorage.getItem("cart_items"));
      let objIndex = products.findIndex((obj => obj.id == product.id && obj.title == product.title));
      if(objIndex!= -1){
        console.log("Before update: ", products[objIndex])

      //Update object's name property.
        products[objIndex].amount = product.amount;
        //let a = (product.price/product.amount)
        products[objIndex].price = (product.amount * product.priceOnTotal);
        //Log object to console again.
        console.log("After update: ", products[objIndex]);
        this.cartItemList = products;
      }
      else{
       // this.cartItemList.push(product);
       let products = JSON.parse(sessionStorage.getItem("cart_items"));
       products.push(product);
       this.cartItemList = products;
      }
    }
    else{
      this.cartItemList.push(product);
    }
    console.log(product);
    //-----check if there are items already added in cart
    this.saveCart();
    this.productList.next(this.cartItemList);
    this.getTotalPrice();

  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  saveCart(): void {
    sessionStorage.setItem('cart_items', JSON.stringify(this.cartItemList));
  }
}
