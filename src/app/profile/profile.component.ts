import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  email: string;
  name: string;
  favorites: string[];
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  standalone: true,
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser);
      } catch (error) {
        console.error('Erro ao parsear usuário:', error);
      }
    }
  }
}
