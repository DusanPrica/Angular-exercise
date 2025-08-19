import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Post {
  id: number;
  title: string;
  body: string;
  tags?: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  posts: any[] = [];
  page: number = 0;
  limit: number = 10;

  tags: string[] = ['history', 'american', 'crime', 'magical', 'french'];
  selectedTag: string = '';
  selectedPost: Post | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    
    this.loading = true;

    const skip = this.page * this.limit;
      this.http.get<any>(`https://dummyjson.com/posts/search?limit=${this.limit}&skip=${skip}`)
      .subscribe((res: any) => {
        this.posts = res.posts;
        this.loading = false;
      }, err => {
        console.error(err);
        this.loading = false; 
    });
  }

  nextPage() {
    this.page++;
    this.loading = true;
    this.loadPosts();
  }
  
  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loading = true;
      this.loadPosts();
    }
  }

  isRed(post: Post) {
    return this.selectedTag && post.tags?.includes(this.selectedTag);
  }

  selectPost(post: Post) {
    this.selectedPost = post;
  }

  openPost(postId: number) {
    this.router.navigate(['/posts-row'], { queryParams: { postId } });
  }
  

  truncate(text: string, length: number) {
    return text.length > length ? text.slice(0, length) + '...' : text;
  }
}
