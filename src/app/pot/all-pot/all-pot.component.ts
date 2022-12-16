import { ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cartItemViewModel } from 'src/app/models/cart/cartItemViewModel';
import { ListCategoriesViewModel } from 'src/app/models/categories/ListCategoriesViewModel';
import { TopProductViewModel } from 'src/app/models/product/TopProductViewModel';
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-all-pot',
  templateUrl: './all-pot.component.html',
  styleUrls: ['./all-pot.component.css']
})
export class AllPotComponent implements OnInit {

  isLoading = false;
  id : number = 0;
  public userName:string = "";
  accessToken : string;
  searchTerm: string = '';
  isLoadingStudents: boolean = false;
  recordsPerPage: number = 5;
  typeProduct: string = "POT";
  isAdmin :0;
  students : any[] = [];
  reload: EventEmitter<boolean> = new EventEmitter();
  SortDesc = false;
  SortBy = "Id";
  topViewModel: TopProductViewModel[]=[];
  categories : ListCategoriesViewModel[] =[];
  nature :any[]=[
    {
      id:0,
      text : "Tất cả"
    },
    {
      id:1,
      text : "Xương rồng"
    },
    {
      id:2,
      text : "Sen đá"
    },
    {
      id:2,
      text : "Sen đá"
    }
  ];
  cartItemViewModels :cartItemViewModel[] = [];
  constructor(private router: Router,private cartService:CartService,private productService:ProductService,private categoryService : CategoryService, private cdr: ChangeDetectorRef) {

   }

  ngOnInit() {
    this.loadCategories();
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

  loadCategories(){
    this.isLoading = true;
    this.categoryService.getCategories(this.typeProduct).then(result=>{
      this.categories = result["data"];
      console.log( this.categories);
      this.isLoading = false;
    })
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  changeTab(e:any){
    console.log(e.target.value);
    //this.typeProduct = e.target.value;
    this.id = e.target.value;
    this.isLoading = true;
    this.productService.getProduct("Id", this.SortDesc ,e.target.value,this.typeProduct).then(result=>{
      console.log(result);
      this.students = result["data"];
      this.isLoading = false;
    });
  }

  changeOption(e:any){
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
    this.productService.getProduct(this.SortBy,this.SortDesc,this.id ,this.typeProduct).then(result=>{
      console.log(result);
      this.students = result["data"];
      this.isLoading = false;
    });
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
    debugger;
    let objIndex = this.cartItemViewModels.findIndex((obj => obj.id == item.id && obj.title == item.title));
    if(objIndex != -1){
      console.log("Before update: ", this.cartItemViewModels[objIndex])

    this.cartItemViewModels[objIndex].amount = this.cartItemViewModels[objIndex].amount + 1;
    this.cartItemViewModels[objIndex].priceOnTotal = ( this.cartItemViewModels[objIndex].amount * item.price);
    let newItem ={
      id : item.id,
      name : item.naMe,
      price : this.cartItemViewModels[objIndex].price,
      amount : this.cartItemViewModels[objIndex].amount,
      priceOnTotal:this.cartItemViewModels[objIndex].priceOnTotal,
      title:item.title
    };
      //Log object to console again.
    console.log("After update: ", this.cartItemViewModels[objIndex]);
    this.cartItemViewModels.push(newItem);
    this.cartService.addtoCart(newItem);
    }
    else{
      let newItem ={
        id : item.id,
        name : item.naMe,
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
    let objIndex = this.cartItemViewModels.findIndex((obj => obj.id == item.id&& obj.title == item.title));
    if(objIndex != -1){
      console.log("Before update: ", this.cartItemViewModels[objIndex])

    //Update object's name property.
    this.cartItemViewModels[objIndex].amount = item.amount;
    this.cartItemViewModels[objIndex].priceOnTotal = (item.amount * item.price);
    let newItem = new cartItemViewModel(item.id,item.name,
      this.cartItemViewModels[objIndex].price, this.cartItemViewModels[objIndex].amount,this.cartItemViewModels[objIndex].priceOnTotal,item.title);
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
