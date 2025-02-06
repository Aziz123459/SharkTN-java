import { Component } from '@angular/core';
import { Investor } from '../investor';
import { Startup } from '../startup';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { Favorite } from '../favorite';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';
import { Incubator } from '../incubator';
import { PreSeed } from '../pre-seed';

@Component({
  selector: 'app-display',
  imports: [CommonModule, HomeNavbarComponent],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent {
role: 'ROLE_INVESTOR' | 'ROLE_STARTUP_FOUNDER' | 'ROLE_ADMIN' |'ROLE_INCUBATOR'|'ROLE_PRE_SEED'|undefined;
  id: string | undefined |null;
  investorData: Investor = {} as Investor;
  startupData: Startup = {} as Startup;
  incubatorData: Incubator = {} as Incubator;
  preSeedData: PreSeed = {} as PreSeed;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') as 'ROLE_INVESTOR' | 'ROLE_STARTUP_FOUNDER' | 'ROLE_ADMIN'|'ROLE_INCUBATOR'|'ROLE_PRE_SEED';
    console.log(this.role);

    
    this.id= this.route.snapshot.paramMap.get('id');

    if (this.role && this.id) {
      this.fetchDetails();
    }
  }

  fetchDetails(): void {
    if (this.role === 'ROLE_STARTUP_FOUNDER' || this.role === 'ROLE_ADMIN') {
      // Fetch investor details for a startup user
      this.apiService.getinvestor(this.id).subscribe({
        next: (data: Investor) => (this.investorData = data),
        error: (err) => console.error('Error fetching investor details:', err)
      });
    } 
    if (this.role === 'ROLE_INVESTOR' || this.role === 'ROLE_ADMIN') {
      // Fetch startup details for an investor user
      this.apiService.getstartup(this.id).subscribe({
        next: (data: Startup) => (this.startupData = data),
        error: (err) => console.error('Error fetching startup details:', err)
      });
    }if (this.role === 'ROLE_INCUBATOR' || this.role === 'ROLE_ADMIN') {
      // Fetch investor details for a startup user
      this.apiService.getPreSeed(this.id).subscribe({
        next: (data: PreSeed) => (this.preSeedData = data),
        error: (err) => console.error('Error fetching pre seed details:', err)
      });
    }if (this.role === 'ROLE_PRE_SEED' || this.role === 'ROLE_ADMIN') {
      // Fetch investor details for a startup user
      this.apiService.getIncubator(this.id).subscribe({
        next: (data: Incubator) => (this.incubatorData= data),
        error: (err) => console.error('Error fetching incubator details:', err)
      });
    }
  }
  
  
  sendEmail(email?: string): void {
    if (!email) {
      console.warn('Email is missing or invalid.');
      return;
    }
    
    console.log('Sending email to:', email);
    window.location.href = `mailto:${email}`;
  }
  
  
  
}
