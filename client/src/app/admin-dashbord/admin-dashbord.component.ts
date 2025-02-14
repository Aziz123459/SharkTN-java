import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { HomeNavbarComponent } from "../home-navbar/home-navbar.component";
import { Investor } from '../investor';
import { Startup } from '../startup';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Incubator } from '../incubator';
import { PreSeed } from '../pre-seed';

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
  incubators: User[] = []; // Startups array
  preseeds: User[] = [];
  investor:Investor={};
  startup:Startup={};
  incubator:Incubator={};
  pressed:PreSeed={};
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
    this.incubators = this.users.filter(user => user.role === 'ROLE_INCUBATOR');
    this.preseeds = this.users.filter(user => user.role === 'ROLE_PRE_SEED');
  }

  deleteUser(userId: string | null | undefined): void {
    this.apiService.deleteUser(userId!).subscribe({
      next: (response) => {
        const message = typeof response === 'string' ? response : response.message;
        console.log('User deleted successfully:', message);
        this.apiService.getusers().subscribe({
          next: (data: User[]) => {
            this.users = data;
            this.filterUsersByType();
          },
          error: (err) => console.error('Error fetching users:', err),
        });
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      },
    });
  }
}