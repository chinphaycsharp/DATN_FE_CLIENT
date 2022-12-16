import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {
  //length = 0;
  public data: any;
  public subscription: Subscription;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscription = this.dataService.getMessage().subscribe(mymessage => this.data = mymessage);
    console.log(this.data);
  }
}
