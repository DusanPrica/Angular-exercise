import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts-row',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './posts-row.component.html',
  styleUrls: ['./posts-row.component.css']
})
export class PostsRowComponent implements OnInit {
  postId: number = 0;
  post: any = null;
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.postId = +params['postId'] || 0;
      if (this.postId) {
        this.loadPost();
      }
    });
  }

  loadPost() {
    this.loading = true;
    this.http.get<any>(`https://dummyjson.com/posts/${this.postId}`)
      .subscribe(res => {
        this.post = res;
        this.loading = false;
      }, err => {
        console.error(err);
        this.loading = false;
      });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
