import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cartItemViewModel } from '../models/cart/cartItemViewModel';
import { TopProductViewModel } from '../models/product/TopProductViewModel';
import { CartService } from '../services/cart/cart.service';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit,AfterViewChecked {
  isLoading = false;
  id:any;
  public userName:string = "";
  accessToken : string;
  searchTerm: string = '';
  isLoadingStudents: boolean = false;
  recordsPerPage: number = 5;
  form!: FormGroup;
  typeProduct: string = "TREE";
  isAdmin :0;
  students : any[] = [];
  topViewModel: TopProductViewModel[]=[];
  reload: EventEmitter<boolean> = new EventEmitter();
  SortDesc = false;
  SortBy = "Id";
  nature :any[]=[
    {
      id:0,
      type:"TREE",
      text : "Cây"
    },
    {
      id:1,
      type:"TOOL",
      text : "Dụng cụ"
    },
    {
      id:2,
      type:"POT",
      text : "Chậu cây"
    }
  ];
  cartItemViewModels :cartItemViewModel[] = [];
  constructor(private router: Router,private cartService:CartService,private fb: FormBuilder, private cdr: ChangeDetectorRef,private productService:ProductService) {
    this.id = localStorage.getItem("userId");
  }

  ngOnInit() {
    this.buildForm();
    this.getTopProducts();
    this.loadCart();
  }

  loadCart(){
    if(JSON.parse(sessionStorage.getItem("cart_items"))){
     this.cartItemViewModels = JSON.parse(sessionStorage.getItem("cart_items"));
     console.log(this.cartItemViewModels);
    }
  }

  getTopProducts(){
    this.isLoading = true;
    this.productService.getTopProducts().then(result=>{
      this.topViewModel = result["resultObj"];
      console.log(this.topViewModel);
      this.isLoading = false;
    });
  }

  changeOption(e:any){;
    console.log(e.target.value);
    this.isLoading = true;
    if(e.target.value == "IdUp"){
      this.SortDesc = true;
      this.SortBy = "Id"
    }
    if(e.target.value == "PriceUp"){
      this.SortDesc = false;
      this.SortBy = "Price"
    }
    if(e.target.value == "PriceDown"){
      this.SortDesc = true;
      this.SortBy = "Id"
    }
    this.productService.getProductByType(this.SortBy,this.SortDesc,this.typeProduct,"").then(result=>{
      console.log(result);
      this.students = result["data"];
      this.isLoading = false;
    });
  }

  changeTab(e:any){
    console.log(e.target.value);
    this.typeProduct = e.target.value;
    this.isLoading = true;
    this.productService.getProductByType("Id",this.SortDesc,e.target.value,"").then(result=>{
      console.log(result);
      this.students = result["data"];
      this.isLoading = false;
    });
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  buildForm() {
    this.form = this.fb.group({
      typeProduct: this.fb.group({
        item: 0
      })
    });
  }

  clearSearchResult() {
    if (this.userName) {
      this.userName = '';
      setTimeout(() => {
        this.reload.emit(true);
        this.reload.emit(false);
      }, 100);
    }
  }

  submitForm(): void {
    console.log(this.typeProduct);
  }

  moveDetail(item:any){
    console.log(item);
    let link = "product/detail/" + item.title +"/"+ item.id;
    this.router.navigate([link,{type: item.title, id: item.id}]);
  }

  openModal(item:any){
    var a = document.getElementById("myModal1") as HTMLElement;
    a.style.display = "block";
    this.addToCart(item);
    // var a = document.getElementById("myModal1") as HTMLElement;
    // a.style.display = "block";
    // let objIndex = this.cartItemViewModels.findIndex((obj => obj.id == id));
    // console.log(this.cartItemViewModels[objIndex]);
    // if(this.cartItemViewModels[objIndex] == undefined){
    //   var item = new cartItemViewModel();
    //   item.id = id;
    //   item.name = name;
    //   item.price = price;
    //   this.cartItemViewModels.push(item);
    // }
    // else{
    //   let objIndex = this.cartItemViewModels.findIndex((obj => obj.id == id));
    //   let newPrice = (this.cartItemViewModels[objIndex].amount + 1) * price;
    //   let newAmount = this.cartItemViewModels[objIndex].amount + 1;
    // //Log object to Console.
    // console.log("Before update: ", this.cartItemViewModels[objIndex])

    // //Update object's name property.
    // this.cartItemViewModels[objIndex].price =newPrice;
    // this.cartItemViewModels[objIndex].amount =newAmount;
    // //Log object to console again.
    // console.log("After update: ", this.cartItemViewModels[objIndex]);
    // }
  }

  closeModal(){
    var a = document.getElementById("myModal1") as HTMLElement;
    a.style.display = "none";
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    var a = document.getElementById("myModal1") as HTMLElement;
    if (event.target == a) {
      a.style.display = "none";
    }
  }

  addToCart(item){
    let objIndex = this.cartItemViewModels.findIndex((obj => obj.id == item.id && obj.title == item.title));
    if(objIndex != -1){
      console.log("Before update: ", this.cartItemViewModels[objIndex])

    this.cartItemViewModels[objIndex].amount = this.cartItemViewModels[objIndex].amount + 1;
    this.cartItemViewModels[objIndex].priceOnTotal = ( this.cartItemViewModels[objIndex].amount * item.price);
    let newItem ={
      id : item.id,
      name : item.name,
      price : this.cartItemViewModels[objIndex].price,
      amount : this.cartItemViewModels[objIndex].amount,
      priceOnTotal:this.cartItemViewModels[objIndex].priceOnTotal,
      title:item.title
    };
      //Log object to console again.
    console.log("After update: ", this.cartItemViewModels[objIndex]);
    this.cartService.addtoCart(newItem);
    }
    else{
      let newItem ={
        id : item.id,
        name : item.name,
        price : item.price,
        amount : 1,
        priceOnTotal: item.price,
        title:item.title
      };

      this.cartItemViewModels.push(newItem);
      this.cartService.addtoCart(newItem);
    }
    //this.cartService.addtoCart(newItem);
  }

  updatePice(item){
    console.log(item);
    let objIndex = this.cartItemViewModels.findIndex((obj => obj.id == item.id && obj.title == item.title));
    if(objIndex != -1){
      console.log("Before update: ", this.cartItemViewModels[objIndex])

    //Update object's name property.
    this.cartItemViewModels[objIndex].amount = item.amount;
    this.cartItemViewModels[objIndex].priceOnTotal = (item.amount * item.price);
    let newItem = new cartItemViewModel(item.id,item.name,
      this.cartItemViewModels[objIndex].price, this.cartItemViewModels[objIndex].amount,this.cartItemViewModels[objIndex].priceOnTotal,item.tile);
    // newItem.id = item.id;
    // newItem.name = item.name;
    // newItem.price = this.cartItemViewModels[objIndex].price ;
    // newItem.amount =   this.cartItemViewModels[objIndex].amount;
      //Log object to console again.
    console.log("After update: ", this.cartItemViewModels[objIndex]);
    //this.cartItemViewModels.push(newItem);
    this.cartService.addtoCart(newItem);
    }
  }
}
