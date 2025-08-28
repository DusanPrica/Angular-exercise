import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { ErrorComponent } from './pages/error/error.component';
import { AuthGuard } from './auth-guard';
import { PreviewPostComponent } from './pages/preview-post/preview-post.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { 
    path: 'posts-row', 
    loadComponent: () => import('./pages/posts-row/posts-row.component').then(m => m.PostsRowComponent), 
    canActivate: [AuthGuard] 
  }, 
  { path: 'edit-post/:id', component: EditPostComponent, canActivate: [AuthGuard] },
  { path: 'preview-post/:id', component: PreviewPostComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: '**', component: ErrorComponent, data: { message: '404 Not Found' } } 
];