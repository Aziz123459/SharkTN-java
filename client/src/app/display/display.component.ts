import { Component } from '@angular/core';
import { Investor } from '../investor';
import { Startup } from '../startup';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { Favorite } from '../favorite';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';

@Component({
  selector: 'app-display',
  imports: [CommonModule, HomeNavbarComponent],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent {
role: 'ROLE_INVESTOR' | 'ROLE_STARTUP_FOUNDER' | 'ROLE_ADMIN' |undefined;
  id: string | undefined |null;
  investorData: Investor = {} as Investor;
  startupData: Startup = {} as Startup;
  
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') as 'ROLE_INVESTOR' | 'ROLE_STARTUP_FOUNDER' | 'ROLE_ADMIN';
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
    }
  }
  
  
  sendEmail(): void {
    console.log('role:', this.role);
    const email =
      this.role === 'ROLE_STARTUP_FOUNDER'
        ? this.investorData.investorEmail
        : this.startupData.startupEmail ;
        console.log('Email:', email);
        
    window.location.href = `mailto:${email}`;
  }
  
}
