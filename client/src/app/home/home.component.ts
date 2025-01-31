import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Investor } from '../investor';
import { Startup } from '../startup';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';
import { LoggedInFooterComponent } from '../logged-in-footer/logged-in-footer.component';
import { User } from '../user';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatFormFieldModule,HomeNavbarComponent,RouterModule, LoggedInFooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  type: 'ROLE_INVESTOR' | 'ROLE_STARTUP_FOUNDER'| 'ROLE_ADMIN'| null = null; 
  item: (Investor | Startup)[] = []; 
  investorData: Investor = {};
  startupData: Startup = {};
  user: User = {};
  allInvestors: Investor[] = [];
  allStartups: Startup[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    
    this.type = this.route.snapshot.paramMap.get('type') as 'ROLE_INVESTOR' | 'ROLE_STARTUP_FOUNDER';

    
    this.getall();
  }

  getall(): void {
    if (this.type ===  'ROLE_STARTUP_FOUNDER') {
      
      this.apiService.getinvestors().subscribe({
        next: (data: Investor[]) => (this.item = data),
        error: (err) => console.error('Error fetching investors:', err),
        complete: () => console.info('Fetched all investors')
      });
    } else if (this.type === 'ROLE_INVESTOR') {
      
      this.apiService.getstartups().subscribe({
        next: (data: Startup[]) => (this.item = data),
        error: (err) => console.error('Error fetching startups:', err),
        complete: () => console.info('Fetched all startups')
      });}
      else if (this.type === 'ROLE_ADMIN') {
        // Fetch all investors for an admin
        this.apiService.getAllInvestors().subscribe({
          next: (data: Investor[]) => {
            this.allInvestors = data; // Store the list of all investors
            console.log('Fetched all investors:', data);
          },
          error: (err) => console.error('Error fetching all investors:', err)
        });
    
        // Fetch all startups for an admin
        this.apiService.getAllStartups().subscribe({
          next: (data: Startup[]) => {
            this.allStartups = data; // Store the list of all startups
            console.log('Fetched all startups:', data);
          },
          error: (err) => console.error('Error fetching all startups:', err)
        });
  }
}
    
    
  getone(): void {
    if (this.type === 'ROLE_STARTUP_FOUNDER') {
      this.apiService.getinvestor(this.investorData.id).subscribe({
        next: (investorData: Investor) => (this.investorData = investorData),
        error: (err) => console.error('Error fetching investor:', err),
        complete: () => console.info('Fetched investor details')
      });
      
    } else if (this.type === 'ROLE_INVESTOR') {
      this.apiService.getstartup(this.startupData.id).subscribe({
        next: (startupData: Startup) => (this.startupData = startupData),
        error: (err) => console.error('Error fetching startup:', err),
        complete: () => console.info('Fetched startup details')
      });
    }
  }
  
  onPostClick(id: string | undefined ): void {
    this.router.navigate(['/display', this.type, id]);
  }
  
  

  

  
  isInvestor(entry: any): entry is Investor {
    return this.type === 'ROLE_STARTUP_FOUNDER';
  }

  
  isStartup(entry: any): entry is Startup {
    return this.type === 'ROLE_INVESTOR';
  }
}

