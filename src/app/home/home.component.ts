import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TopProductViewModel } from '../models/product/TopProductViewModel';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit,AfterViewChecked {
  public userName:string = "";
  form!: FormGroup;
  typeProduct: 0;
  isAdmin :0;
  users : any[] = [];
  topViewModel: TopProductViewModel[]=[];
  reload: EventEmitter<boolean> = new EventEmitter();
  isLoadingStudents: boolean = false;
  nature :any[]=[
    {
      id:0,
      text : "Cây"
    },
    {
      id:1,
      text : "Dụng cụ"
    },
    {
      id:2,
      text : "Chậu cây"
    }
  ]
  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef,private productService:ProductService) {

  }

  async ngOnInit() {
    this.buildForm();
    var result = await this.productService.getTopProducts();
    this.topViewModel = result["resultObj"];
    console.log(this.topViewModel);
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
    this.typeProduct = this.form.value.typeProduct;
    console.log(this.typeProduct);
  }
}
