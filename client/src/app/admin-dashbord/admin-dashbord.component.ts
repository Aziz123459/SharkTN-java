import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { HomeNavbarComponent } from "../home-navbar/home-navbar.component";
import { Investor } from '../investor';
import { Startup } from '../startup';

@Component({
  selector: 'app-admin-dashbord',
  imports: [MatTableModule, CommonModule, HomeNavbarComponent],
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent {
  users: User[] = []; // All users
  startups: User[] = []; // Startups array
  investors: User[] = []; // Investors array
  investor:Investor={};
  startup:Startup={};
  constructor(private apiService: ApiService) {}

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
    this.startups = this.users.filter(user => user.role === 'startup');
    this.investors = this.users.filter(user => user.role === 'investor');
  }

  deleteUser(userId: string |null|undefined,acctype:string|undefined): void {
    // Call the delete function from the API service
    console.log(userId,acctype)
    if(acctype=='investor'){
      this.apiService.getInvestorByUserId(userId).subscribe({
        next: (data:Investor) => {
          this.investor = data;
          console.log(this.investor)
          let investerid=this.investor.id
          this.apiService.deleteInvestorById(investerid)
        },
        error: (err) => console.error('Error fetching users:', err),
      });
      }else if(acctype=='startup'){
        this.apiService.getStartupByUserId(userId).subscribe({
          next: (data:Startup) => {
            this.startup = data;
            console.log(this.startup)
            let startupid=this.startup.id
            this.apiService.deleteStartupById(startupid)
          },
          error: (err) => console.error('Error fetching users:', err),
        });
      }
      this.apiService.deleteUser(userId).subscribe({
        next: () => {
          this.apiService.getusers().subscribe({
            next: (data: User[]) => {
              this.users = data;
              this.filterUsersByType();
            },
            error: (err) => console.error('Error fetching users:', err),
          });
        },
        error: (err) => console.error('Error fetching users:', err),
      });
  }
}
