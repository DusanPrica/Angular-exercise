import { Component, OnInit, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../services/current-user.service';

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

  //@Input() value : string = '';

  dropdownPostId: number | null = null;
  dropdownPosition = { x: 0, y: 0 };
  showPreviewDialog: boolean = false;

  currentUser: any;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit() {
    this.loadPosts();

    if (!this.currentUserService.isLoggedIn()) { 
      this.router.navigate (['/login']);
    } else {
      this.currentUser = this.currentUserService.getUser();
    }
  }

  logout() {
    this.currentUserService.logout(); 
    this.router.navigate(['/login']);
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

  showDropdown(event: MouseEvent, postId: number) {
    event.stopPropagation();
    if (this.dropdownPostId === postId) {
      this.dropdownPostId = null;
    } else {
      this.dropdownPostId = postId;
      this.dropdownPosition = { x: event.clientX, y: event.clientY };
    }
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.dropdownPostId = null; 
  }

  editPost(post: Post) {
    this.router.navigate(['/posts-row'], { queryParams: { postId: post.id, isEditMode: true } });
  }

  deletePost(post: Post) {
    this.posts = this.posts.filter(p => p.id !== post.id);
    console.log('Post deleted locally:', post);
  }

  previewDialog(post: Post) {
    this.selectedPost = post;
    this.showPreviewDialog = true;
  }

  closeDialog() {
    this.showPreviewDialog = false;
    this.selectedPost = null;
    this.loadPosts();
  }

  saveDialog() {
    console.log('Save clicked for post:', this.selectedPost);
    this.closeDialog();
  }

  previewPage(post: Post) {
    console.log('Preview in page', post);
  }
}
