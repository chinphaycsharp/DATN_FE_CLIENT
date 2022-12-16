import { ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopProductViewModel } from 'src/app/models/product/TopProductViewModel';
import { ListTagPostViewModel } from 'src/app/models/tagPost/ListTagPostViewModel';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { TagpostService } from 'src/app/services/tagpost/tagpost.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

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
  tagpost : ListTagPostViewModel[] =[];
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
  constructor(private router: Router,private productService:ProductService,private tagPostService:TagpostService,private categoryService : CategoryService, private cdr: ChangeDetectorRef) {

   }

  ngOnInit() {
    this.loadtagposts();
    this.getTopProducts();
  }

  getTopProducts(){
    this.isLoading = true;
    this.productService.getTopProducts().then(result=>{
      this.topViewModel = result["resultObj"];
      console.log(this.topViewModel);
      this.isLoading = false;
     });
  }

  loadtagposts(){
    this.isLoading = true;
    this.tagPostService.getTagPosts().then(result=>{
      this.tagpost = result["data"];
      console.log( this.tagpost);
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
}
