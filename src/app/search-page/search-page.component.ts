import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  searchStr:string;
  isLoading = false;
  id:any;
  public userName:string = "";
  accessToken : string;
  searchTerm: string = '';
  isLoadingStudents: boolean = false;
  recordsPerPage: number = 5;
  students : any[] = [];
  typeProduct: string = "";
  reload: EventEmitter<boolean> = new EventEmitter();
  SortDesc = false;
  SortBy = "Id";
  constructor(private route: ActivatedRoute,private productService:ProductService) {
    this.searchStr =  this.route.snapshot.params["searchStr"];
    console.log( this.searchStr);
  }

  ngOnInit(): void {

  }

  changeOption(e:any){
    debugger;
    console.log(e.target.value);
    this.isLoading = true;
    if(e.target.value == "IdUp"){
      this.SortDesc = true;
      this.SortBy = "Id"
    }
    if(e.target.value == "PriceUp"){
      this.SortDesc = true;
      this.SortBy = "Price"
    }
    if(e.target.value == "PriceDown"){
      this.SortDesc = false;
      this.SortBy = "Id"
    }
    this.productService.getProductByType(this.SortBy,this.SortDesc,this.typeProduct,this.searchStr).then(result=>{
      console.log(result);
      this.students = result["data"];
      this.isLoading = false;
    });
  }

  changeTab(e:any){
    console.log(e.target.value);
    this.typeProduct = e.target.value;
    this.isLoading = true;
    this.productService.getProductByType("Id",this.SortDesc,e.target.value,this.searchStr).then(result=>{
      console.log(result);
      this.students = result["data"];
      this.isLoading = false;
    });
  }
}
