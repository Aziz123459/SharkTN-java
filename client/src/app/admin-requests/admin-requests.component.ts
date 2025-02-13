import { Component } from '@angular/core';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';
import { User } from '../user';
import { Investor } from '../investor';
import { Startup } from '../startup';
import { Incubator } from '../incubator';
import { PreSeed } from '../pre-seed';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StartupWithUser } from '../startup-with-user';

@Component({
  selector: 'app-admin-requests',
  imports: [HomeNavbarComponent, CommonModule, RouterModule],
  templateUrl: './admin-requests.component.html',
  styleUrl: './admin-requests.component.css'
})
export class AdminRequestsComponent {

  users: User[] = []; // All users
  startups: User[] = []; // Startups array
  investors: User[] = []; // Investors array
  incubators: User[] = []; // Startups array
  preseeds: User[] = [];
  pendingStartups: StartupWithUser[] = [];
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
          console.log("users: ",data);
          
          this.filterUsersByType();
        },
        error: (err) => console.error('Error fetching users:', err),
      });
      this.loadPendingStartups();
    }
  
    filterUsersByType(): void {
      // Filter users by account type
      this.startups = this.users.filter(user => user.role === 'ROLE_STARTUP_FOUNDER');
      console.log("Users of role Startup:", this.startups);
      this.investors = this.users.filter(user => user.role === 'ROLE_INVESTOR');
      this.incubators = this.users.filter(user => user.role === 'ROLE_INCUBATOR');
      this.preseeds = this.users.filter(user => user.role === 'ROLE_PRE_SEED');
    }

    loadPendingStartups(): void {
      this.apiService.getstartupswithusers().subscribe({
        next: (startupData: StartupWithUser[]) => {
          this.pendingStartups = startupData.filter(startup => startup.status === 0);
          console.log("Pending Startups:", this.pendingStartups);
        },
        error: (error) => {
          console.error('Error fetching startups:', error);
        }
      });
    }
    
    


}
