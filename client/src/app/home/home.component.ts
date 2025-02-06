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
import { PreSeed } from '../pre-seed';
import { Incubator } from '../incubator';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatFormFieldModule,HomeNavbarComponent,RouterModule, LoggedInFooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  type: 'ROLE_INVESTOR' | 'ROLE_STARTUP_FOUNDER'| 'ROLE_ADMIN'|'ROLE_INCUBATOR'|'ROLE_PRE_SEED'| null = null; 
  item: (Investor | Startup)[] = []; 
  item2:( PreSeed)[]=[];
  item3:(Incubator)[]=[]
  investorData: Investor = {};
  startupData: Startup = {};
  incubatorData: Incubator = {}; 
  preSeedData: PreSeed = {}; 
  user: User = {};
  allInvestors: Investor[] = [];
  allStartups: Startup[] = [];
  allIncubators: Incubator[] = []; 
  allPreSeeds: PreSeed[] = []; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    
    this.type = this.route.snapshot.paramMap.get('type') as 'ROLE_INVESTOR' | 'ROLE_STARTUP_FOUNDER'|'ROLE_INCUBATOR'|'ROLE_PRE_SEED';

    
    this.getall();
  }

  getall(): void {
    if (this.type === 'ROLE_STARTUP_FOUNDER') {
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
      });
    } else if (this.type === 'ROLE_INCUBATOR') {
      this.apiService.getPreSeeds().subscribe({
        next: (data: PreSeed[]) => {
          this.item2 = data; 
          console.log('Fetched pre-seeds for incubator:', data);
        },
        error: (err) => console.error('Error fetching pre-seeds for incubator:', err)
      });
    } else if (this.type === 'ROLE_PRE_SEED') {
      // Fetch incubators for pre-seed investments
      this.apiService.getIncubators().subscribe({
        next: (data: Incubator[]) => {
          this.item3 = data; 
          console.log('Fetched incubators for pre-seed:', this.item3);
        },
        error: (err) => console.error('Error fetching incubators for pre-seed:', err)
      });
    }
    
    else if (this.type === 'ROLE_ADMIN') {
      this.apiService.getinvestors().subscribe({
        next: (data: Investor[]) => {
          this.allInvestors = data; 
          console.log('Fetched all investors:', data);
        },
        error: (err) => console.error('Error fetching all investors:', err)
      });

      this.apiService.getstartups().subscribe({
        next: (data: Startup[]) => {
          this.allStartups = data; 
          console.log('Fetched all startups:', data);
        },
        error: (err) => console.error('Error fetching all startups:', err)
      });

      this.apiService.getIncubators().subscribe({
        next: (data: Incubator[]) => {
          this.allIncubators = data; 
          console.log('Fetched all incubators:', data);
        },
        error: (err) => console.error('Error fetching all incubators:', err)
      });

      this.apiService.getPreSeeds().subscribe({
        next: (data: PreSeed[]) => {
          this.allPreSeeds = data; 
          console.log('Fetched all pre-seeds:', data);
        },
        error: (err) => console.error('Error fetching all pre-seeds:', err)
      });
    } 
  }
    
  getone(): void {
    if (this.type === 'ROLE_STARTUP_FOUNDER' && this.investorData.id) {
      this.apiService.getinvestor(this.investorData.id).subscribe({
        next: (data: Investor) => (this.investorData = data),
        error: (err) => console.error('Error fetching investor:', err),
        complete: () => console.info('Fetched investor details')
      });
    } else if (this.type === 'ROLE_INVESTOR' && this.startupData.id) {
      this.apiService.getstartup(this.startupData.id).subscribe({
        next: (data: Startup) => (this.startupData = data),
        error: (err) => console.error('Error fetching startup:', err),
        complete: () => console.info('Fetched startup details')
      });
    } else if (this.type === 'ROLE_INCUBATOR' && this.preSeedData.id) {
      this.apiService.getPreSeed(this.preSeedData.id).subscribe({
        next: (data: PreSeed) => (this.preSeedData = data),
        error: (err) => console.error('Error fetching pre-seed:', err),
        complete: () => console.info('Fetched pre-seed details')
      });
    } else if (this.type === 'ROLE_PRE_SEED' && this.incubatorData.id) {
      this.apiService.getIncubator(this.incubatorData.id).subscribe({
        next: (data: Incubator) => (this.incubatorData = data),
        error: (err) => console.error('Error fetching incubator:', err),
        complete: () => console.info('Fetched incubator details')
      });
    }
  }
  
  
  onPostClick(id: string | undefined ): void {
    this.router.navigate(['/display', this.type, id]);
  }
  
  
  truncateText(text: string | undefined, limit: number = 40): string {
    if (!text) return ''; // Retourne une chaîne vide si le texte est undefined
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
  
  
  

  
  isInvestor(entry: any): entry is Investor {
    return this.type === 'ROLE_STARTUP_FOUNDER';
  }

  
  isStartup(entry: any): entry is Startup {
    return this.type === 'ROLE_INVESTOR';
  }

  isIncubator(test:any):test is Incubator{
    return this.type ==='ROLE_INCUBATOR'
  }

  isPreSeed(entry:any):entry is PreSeed{
    return this.type ==='ROLE_PRE_SEED'
  }

}

