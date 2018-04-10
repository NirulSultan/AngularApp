import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  post: Post[];
  currentPost: Post = {
    id: 0,
    title: '',
    body: ''
  };

  // tslint:disable-next-line:no-inferrable-types
  isEdit: boolean = false;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(post => {
      this.post = post;
    });
  }

  onNewPost(post: Post) {
    this.post.unshift(post);
  }

  editPost(post: Post) {
    this.currentPost = post;
    this.isEdit = true;
  }

  onUpdatedPost(post: Post) {
    this.post.forEach((cur, index) => {
      if (post.id === cur.id) {
        this.post.splice(index, 1);
        this.post.unshift(post);
        this.isEdit = false;
        this.currentPost = {
          id: 0,
          title: '',
          body: ''
        };
      }
    });
  }

  removePost(post: Post) {
    if (confirm('Are you sure?')) {
      this.postService.removePost(post.id).subscribe(() => {
        this.post.forEach((cur, index) => {
          if (post.id === cur.id) {
            this.post.splice(index, 1);
          }
        });
      });
    }
  }
}
