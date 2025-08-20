import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: ``
})
export class EditPostComponent implements OnInit {
  post: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`https://dummyjson.com/posts/${id}`).subscribe(res => {
        this.post = res;
      });
    }
  }

  savePost() {
    console.log('Post saved:', this.post);
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
