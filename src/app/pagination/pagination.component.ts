import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PageService } from '../services/pager/page.service';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  // Current page number
  currentPageNumber: number = 1;
  // Total records count
  totalRecordsCount: number = 0;
  // Total pages
  totalPages: number = 0;
  // Pager
  pager: any = {};

  constructor(private http: HttpClient, private pageService: PageService) {
    console.log(123);
  }
// API route
@Input() apiRoute: string = '';
// Records per page
@Input() recordsPerPage: number = 0;
// Response data
@Output() responseData = new EventEmitter<any[]>();
// Loading
@Output() loading = new EventEmitter<boolean>();
// Reload
@Input() reload: EventEmitter<boolean> | undefined;

// On init
ngOnInit() {

  this.watchReload();
}

// To be emitted from parent component
watchReload() {
  if (this.reload) {
    this.reload.subscribe((reload: any) => {
      if (reload) {
        this.getData(this.currentPageNumber);
      }
    });
  }
}

// Fetch new page data
next() {
  this.getData(this.currentPageNumber + 1)
}

// Fetch previous page data
prev() {
  this.getData(this.currentPageNumber - 1)
}

handleHttpParams(pageNo:any): HttpParams{
    let params = new HttpParams({
      fromObject:{
        type:"TREE",
        ItemsPerPage : "8",
        Page : Number(pageNo).toString()
      }
    });
    return params;
}

// Fetch data from API
getData(pageNo: any) {
  debugger;
  this.loading.emit(true);
  this.responseData.emit([]);
  let params = this.handleHttpParams(pageNo);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  this.currentPageNumber = Number(pageNo);
  this.http.get(this.apiRoute,{headers:headers,params:params}).subscribe(
    (response: any) => {
      console.log(response);
      this.totalRecordsCount = response.totalRows;
      this.responseData.emit(response.data);
      this.totalPages = Math.ceil(response.count / 10);
      this.setPagination(this.currentPageNumber);
      this.loading.emit(false);
    },
    (error) => {
      this.loading.emit(false);
      alert(error.message);
    }
  );
}

// Set pagination data and pager data
setPagination(pageNo: any) {
  pageNo = Number(pageNo);
  this.currentPageNumber = pageNo;
  this.pager = this.pageService.getPager(
    this.totalRecordsCount,
    pageNo,
    this.recordsPerPage
  );
}

// Watch for changes: [searchTerm & recordsPerPage]
ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
  const term = changes['searchTerm'] && changes['searchTerm'].currentValue;
  const recordsPerPage =
    changes['recordsPerPage'] && changes['recordsPerPage'].currentValue;
  if (term) {
    this.getData(this.currentPageNumber);
  }
  if (recordsPerPage) {
    this.getData(this.currentPageNumber);
  }
}

// Track by
trackByFn(index: any, item: any) {
  return item; // or item.id
}

}
