import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  public messages:any[] = [
    {
      userName:"Quangle",
      text:"hello"
    },
    {
      userName:"test",
      text:"hello"
    }
  ];
  userName : string = "Quangle"
  constructor() { }

  ngOnInit(): void {
  }

}
