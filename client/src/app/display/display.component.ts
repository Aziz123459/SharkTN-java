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
type: 'investor' | 'startup' | 'admin' |undefined;
  id: string | undefined |null;
  investorData: Investor = {} as Investor;
  startupData: Startup = {} as Startup;
  
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type') as 'investor' | 'startup' | 'admin';
    this.id= this.route.snapshot.paramMap.get('id');

    if (this.type && this.id) {
      this.fetchDetails();
    }
  }

  fetchDetails(): void {
    if (this.type === 'startup' || this.type === 'admin') {
      // Fetch investor details for a startup user
      this.apiService.getinvestor(this.id).subscribe({
        next: (data: Investor) => (this.investorData = data),
        error: (err) => console.error('Error fetching investor details:', err)
      });
    } 
    if (this.type === 'investor' || this.type === 'admin') {
      // Fetch startup details for an investor user
      this.apiService.getstartup(this.id).subscribe({
        next: (data: Startup) => (this.startupData = data),
        error: (err) => console.error('Error fetching startup details:', err)
      });
    }
  }
  
  
  sendEmail(): void {
    console.log('type:', this.type);
    const email =
      this.type === 'startup'
        ? this.investorData.investorEmail
        : this.startupData.startupEmail ;
        console.log('Email:', email);
        
    window.location.href = `mailto:${email}`;
  }
  
}
