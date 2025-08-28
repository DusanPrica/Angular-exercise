import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from "../home/home.component"; 
import { CurrentUserService } from '../../services/current-user.service';
import { CustomTextInputComponent } from '../../pages/custom-text-input/custom-text-input.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HomeComponent, CustomTextInputComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username = '';
  password = '';
  error: string | null = null;
  users: any[] = [];

  constructor(
    private router: Router, 
    private toastr: ToastrService,
    private currentUserService: CurrentUserService,
    private http: HttpClient
  ) {}

  login(form: any) {
    if (form.invalid) {
      return;
    }

    const user = this.username.trim().toLowerCase();
    const pass = this.password.trim().toLowerCase();

    if (user === 'test' && pass === 'test123') {
      this.toastr.success('Logged in successfully!');
      this.currentUserService.setUser({username: user})
      this.router.navigate(['/home']);
    } else {
      this.toastr.error('Wrong username or password!');
    }
    
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  ngOnInit() {
    this.http.get<any>('assets/database.json').subscribe(data => {
      this.users = data.users;
    });
  }
}
