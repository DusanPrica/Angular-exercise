import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../services/current-user.service';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';

interface Post {
  id: number | null;
  title: string;
  body: string;
  tags?: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loading: boolean = false;
  posts: any[] = [];
  page: number = 0;
  limit: number = 10;
  totalPosts: number = 0;
  maxVisiblePages = 5;

  tags: string[] = ['history', 'american', 'crime', 'magical', 'french'];
  selectedTag: string = '';
  selectedPost: Post | null = null;
  previewedPost: Post | null = null;

  dropdownPostId: number | null = null;
  dropdownPosition = { x: 0, y: 0 };
  showPreviewDialog: boolean = false;

  currentUser: any;

  availableOptions: string[] = [];

  constructor(
    private http: HttpClient, 
    private router: Router,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit() {
    this.loadPosts();

    if (!this.currentUserService.isLoggedIn()) { 
      this.router.navigate(['/login']);
    } else {
      this.currentUser = this.currentUserService.getUser();

      if (this.currentUser.role === 'User') {
        this.availableOptions = ['Preview in Dialog', 'Preview in Page'];
      } else if (this.currentUser.role === 'Admin') {
        this.availableOptions = ['Edit', 'Delete', 'Preview in Dialog', 'Preview in Page'];
      }
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalPosts / this.limit);
  }

  logout() {
    this.currentUserService.logout(); 
    this.router.navigate(['/login']);
  }

  loadPosts() {
    this.loading = true;
    const skip = this.page * this.limit;
    this.http.get<any>(`https://dummyjson.com/posts?limit=${this.limit}&skip=${skip}`)
      .subscribe((res: any) => {
        this.posts = res.posts;
        this.totalPosts = res.total;
        this.loading = false;
      }, err => {
        console.error(err);
        this.loading = false; 
    });
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadPosts();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadPosts();
    }
  }

  goToPage(page: number) {
    this.page = page - 1; 
    this.loadPosts();
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.loadPosts();
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

  get visiblePages(): number[] {
    const pages: number[] = [];
    const total = this.totalPages; 
    const max = Math.max(1, this.maxVisiblePages); 
  
    if (total === 0) return pages;
    if (total <= max) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }
  
    const half = Math.floor(max / 2);
    let start = (this.page + 1) - half;
    let end = start + max - 1;
  
    if (start < 1) {
      start = 1;
      end = Math.min(total, max);
    }
    if (end > total) {
      end = total;
      start = Math.max(1, end - max + 1);
    }
  
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }
  
  @HostListener('document:click')
  onDocumentClick() {
    this.dropdownPostId = null; 
  }

  editPost(post: Post) {
    this.router.navigate(['/posts-row'], { queryParams: { postId: post.id, isEditMode: true } });
  }

  deletePost(post: Post) {
    post.title = '';
    post.body = '';
    post.tags = [];
  }

  previewDialog(post: Post) {
    this.selectedPost = post;
    this.showPreviewDialog = true;
  }

  closeDialog() {
    this.showPreviewDialog = false;
    this.selectedPost = null;
  }

  saveDialog() {
    console.log('Save clicked for post:', this.selectedPost);
    this.closeDialog();
  }

  previewPage(post: Post) {
    this.router.navigate(['/posts-row'], { queryParams: { postId: post.id, isEditMode: false } });  
  }

  closePreview() {
    this.previewedPost = null;
  }

  handleDropdownAction(option: string, post: Post) {
    switch(option) {
      case 'Edit':
        this.editPost(post);
        break;
      case 'Delete':
        this.deletePost(post);
        break;
      case 'Preview in Dialog':
        this.previewDialog(post);
        break;
      case 'Preview in Page':
        this.previewPage(post);
        break;
    }
    this.dropdownPostId = null;
  }
}