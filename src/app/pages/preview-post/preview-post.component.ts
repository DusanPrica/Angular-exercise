import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

interface Post {
  id: number;
  title: string;
  body: string;
  tags?: string[];
}

@Component({
  selector: 'app-preview-post',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './preview-post.component.html',
  styleUrls: ['./preview-post.component.css']
})
export class PreviewPostComponent implements OnInit {
  post: Post | null = null;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const postId = +this.route.snapshot.paramMap.get('id')!;
    if (postId) {
      this.loadPost(postId);
    } else {
      this.router.navigate(['/home']);
    }
  }

  loadPost(postId: number) {
    this.loading = true;
    this.http.get<Post>(`https://dummyjson.com/posts/${postId}`)
      .subscribe(post => {
        this.post = post;
        this.loading = false;
      }, err => {
        console.error(err);
        this.loading = false;
      });
  }

  back() {
    this.location.back();
  }
}
