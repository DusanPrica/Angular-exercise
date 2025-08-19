import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // samo servis, bez forRoot()

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username = '';
  password = '';
  error: string | null = null;

  constructor(private router: Router, private toastr: ToastrService) {}

  login() {
    const user = this.username.trim().toLowerCase();
    const pass = this.password.trim().toLowerCase();

    if (user === 'test' && pass === 'test123') {
      this.toastr.success('Logged in successfully!');
      this.router.navigate(['/home']);
    } else {
      this.toastr.error('Wrong username or password!');
    }
    
  }
}
