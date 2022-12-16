import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, QueryList, ViewChildren, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { cartItemViewModel } from 'src/app/models/cart/cartItemViewModel';
import { ListCategoriesViewModel } from 'src/app/models/categories/ListCategoriesViewModel';
import { TopProductViewModel } from 'src/app/models/product/TopProductViewModel';
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { CurrencyPipe } from "@angular/common";
@Component({
  selector: 'app-all-tree',
  templateUrl: './all-tree.component.html',
  styleUrls: ['./all-tree.component.css']
})
export class AllTreeComponent implements OnInit,AfterViewChecked,OnChanges  {
  isLoading = false;
  id : number = 0;
  public userName:string = "";
  accessToken : string;
  searchTerm: string = '';
  isLoadingStudents: boolean = false;
  recordsPerPage: number = 5;
  typeProduct: string = "TREE";
  isAdmin :0;
  students : any[] = [];
  reload: EventEmitter<boolean> = new EventEmitter();
  SortDesc = false;
  SortBy = "Id";
  topViewModel: TopProductViewModel[]=[];
  categories : ListCategoriesViewModel[] =[];
  cartItemViewModels :cartItemViewModel[] = [];
  cartItemViewTemps :cartItemViewModel[] = [];
  length = 0;
  @Output() data:EventEmitter<any> = new EventEmitter();
  @ViewChildren("subTotalWrap") subTotalItems: QueryList<ElementRef>;
  @ViewChildren("subTotalWrap_existing") subTotalItems_existing: QueryList<
  ElementRef
>;
  constructor(private router: Router,private currencyPipe: CurrencyPipe,private cartService:CartService,private productService:ProductService,private categoryService : CategoryService, private cdr: ChangeDetectorRef) {

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
      this.isLoading = false;
     });
  }

  loadCategories(){
    this.isLoading = true;
    this.categoryService.getCategories(this.typeProduct).then(result=>{
      this.categories = result["data"];
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
    this.productService.getProduct(this.SortBy,this.SortDesc,this.id,this.typeProduct ).then(result=>{
      this.students = result["data"];
      this.isLoading = false;
    });
  }

  openModal(item:any){
    var a = document.getElementById("myModal1") as HTMLElement;
    a.style.display = "block";
    this.addToCart(item);
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

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
  }

  moveDetail(item:any){
    let link = "product/detail/" + item.title +"/"+ item.id;
    this.router.navigate([link,{type: item.title, id: item.id}]);
  }
}
