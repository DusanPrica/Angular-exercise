import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { CurrentUserService } from '../../services/current-user.service';

interface User {
  username: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = '';
  password = '';
  role = 'User';
  users: User[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit() {
    this.http.get<{ users: User[] }>('assets/database.json').subscribe(data => {
      this.users = data.users;
    });
  }

  register(form: any) {
    if (form.invalid) {
      this.toastr.error('Please fill all fields!');
      return;
    }
  
    const existingUser = this.users.find(
      u => u.username.toLowerCase() === this.username.trim().toLowerCase()
    );
  
    if (existingUser) {
      this.toastr.error('Username already exists!');
      return;
    }
  
    const newUser: User = {
      username: this.username.trim(),
      password: this.password.trim(),
      role: this.role
    };
  
    this.users.push(newUser);
  
    this.currentUserService.setUser(newUser);
  
    this.toastr.success('Registration successful!');
    this.router.navigate(['/home']);
  }
  
}
