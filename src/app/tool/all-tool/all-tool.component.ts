import { Component, OnInit } from '@angular/core';
import { TopProductViewModel } from 'src/app/models/product/TopProductViewModel';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-all-tool',
  templateUrl: './all-tool.component.html',
  styleUrls: ['./all-tool.component.css']
})
export class AllToolComponent implements OnInit {

  topViewModel: TopProductViewModel[]=[];

  constructor(private productService:ProductService) { }

  async ngOnInit() {
    var result = await this.productService.getTopProducts();
    this.topViewModel = result["resultObj"];
    console.log(this.topViewModel);
  }

}
