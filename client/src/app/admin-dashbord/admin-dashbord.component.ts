import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { HomeNavbarComponent } from "../home-navbar/home-navbar.component";
import { Investor } from '../investor';
import { Startup } from '../startup';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashbord',
  imports: [MatTableModule, CommonModule, HomeNavbarComponent,RouterModule],
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent {
  users: User[] = []; // All users
  startups: User[] = []; // Startups array
  investors: User[] = []; // Investors array
  investor:Investor={};
  startup:Startup={};
  
  constructor(private apiService: ApiService, private route: ActivatedRoute,
    private router: Router,) {}

  ngOnInit(): void {
    // Fetch users from the API
    this.apiService.getusers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.filterUsersByType();
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  filterUsersByType(): void {
    // Filter users by account type
    this.startups = this.users.filter(user => user.role === 'ROLE_STARTUP_FOUNDER');
    this.investors = this.users.filter(user => user.role === 'ROLE_INVESTOR');
  }

  deleteUser(userId: string | null | undefined): void {
    if (!userId) {
      console.error('User ID is missing.');
      alert('User ID is required.');
      return;
    }
  
    if (confirm('Are you sure you want to delete this account?')) {
      this.apiService.deleteUser(userId).subscribe({
        next: (response) => {
          const message = typeof response === 'string' ? response : response.message;
          console.log('User deleted successfully:', message);
          alert(message || 'Account deleted successfully.');
  
          // Clear user session and redirect
          localStorage.clear();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error deleting user:', err);
  
          if (err.status === 404) {
            alert('User not found.');
          } else if (err.status === 500) {
            alert('Server error. Please try again later.');
          } else {
            alert(err.error?.message || 'Failed to delete account.');
          }
        },
      });
    }
      
}
}
