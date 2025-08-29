import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

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
    private toastr: ToastrService
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

    const newUser: User = {
      username: this.username.trim(),
      password: this.password.trim(),
      role: this.role
    };

    const storedUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const existsInStorage = storedUsers.find(
      u => u.username.toLowerCase() === newUser.username.toLowerCase()
    );
    const existsInDb = this.users.find(
      u => u.username.toLowerCase() === newUser.username.toLowerCase()
    );

    if (existsInStorage || existsInDb) {
      this.toastr.error('Username already exists!');
      return;
    }

    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
   
    this.router.navigate(['/login'], { queryParams: { registered: true } });
  }
}

