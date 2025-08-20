import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts-row',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './posts-row.component.html',
  styleUrls: ['./posts-row.component.css']
})
export class PostsRowComponent implements OnInit {
  postId: number = 0;
  post: any = null;
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

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
    this.http.get<any>(`https://dummyjson.com/posts/${this.postId}`).subscribe(
      res => {
        this.post = res;
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
      }
    );
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  savePost() {
    // Ovde ide logika za čuvanje izmena
    console.log('Saved post:', this.post);
    this.goBack();
  }
}

