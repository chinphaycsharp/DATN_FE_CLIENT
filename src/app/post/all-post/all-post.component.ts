import { Component, OnInit } from '@angular/core';
import { ListPostViewModel } from 'src/app/models/post/ListPostViewModel';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  listPost:ListPostViewModel[]=[];
  constructor(private postService:PostService) { }

  async ngOnInit() {
    var result = await this.postService.getTopPosts();
    console.log(result);
    this.listPost = result["data"];
    console.log(this.listPost );
  }

}
