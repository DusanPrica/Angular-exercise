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
  role = 'User'; // Default role
  users: User[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Učitavanje postojećih korisnika iz database.json
    this.http.get<{ users: User[] }>('assets/database.json').subscribe(data => {
      this.users = data.users;
    });
  }

  register(form: any) {
    if (form.invalid) {
      this.toastr.error('Please fill all fields!');
      return;
    }

    // Provera da li username već postoji
    const existingUser = this.users.find(
      u => u.username.toLowerCase() === this.username.trim().toLowerCase()
    );

    if (existingUser) {
      this.toastr.error('Username already exists!');
      return;
    }

    // Kreiranje novog korisnika
    const newUser: User = {
      username: this.username.trim(),
      password: this.password.trim(),
      role: this.role
    };

    // Dodavanje u niz korisnika (za testiranje)
    this.users.push(newUser);

    // Napomena: direktno pisanje u database.json iz Angulara nije moguće.
    // Ako želiš trajno čuvanje, treba backend API ili lokalni storage.
    // Za sada ovo služi da možeš odmah da se loguješ.

    // Navigacija na login sa query param da toastr zna da je registracija uspešna
    this.router.navigate(['/login'], { queryParams: { registered: true } });
  }
}
