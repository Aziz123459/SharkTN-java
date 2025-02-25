import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home-navbar',
  imports: [ MatToolbarModule, MatButtonModule,RouterModule,CommonModule],
  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.css'
})
export class HomeNavbarComponent {
  type = localStorage.getItem("role");
  id = localStorage.getItem("userId");
  bookings: any[] = [];
  constructor(private apiService: ApiService, private router: Router) {}

  onLogout(): void {
    this.apiService.logoutUser().subscribe({
      next: () => {
        console.log('User logged out successfully');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigate(['/authenticate']);
      },
      error: (err) => {
        console.error('Error during logout:', err);
      }
    });
  }

  async  logout():Promise<void>{

    await localStorage.clear();
    this.router.navigate(['/authenticate']);
  }
    // Fetch user bookings based on role
    
}

