import { Component, EventEmitter, OnInit } from '@angular/core';
import { TopProductViewModel } from 'src/app/models/product/TopProductViewModel';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public isLoading =false;
  id:any;
  accessToken : string;
  students: any = [];
  searchTerm: string = '';
  reload: EventEmitter<boolean> = new EventEmitter();
  isLoadingStudents: boolean = false;
  recordsPerPage: number = 5;

  constructor(private productService:ProductService) {
    this.accessToken = localStorage.getItem("accessToken");
    this.id = localStorage.getItem("userId");
  }

  async ngOnInit() {
  }

}
