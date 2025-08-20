import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PostsRowComponent } from './pages/posts-row/posts-row.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'posts-row', component: PostsRowComponent }, 
  { path: 'edit-post/:id', component: EditPostComponent }
];
