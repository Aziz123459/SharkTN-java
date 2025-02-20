import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';
import { Booking } from '../booking';
import { Bookinginvestor } from '../bookinginvestor';

@Component({
  selector: 'app-my-booking',
  imports: [MatToolbarModule, MatButtonModule,RouterModule,CommonModule,HomeNavbarComponent],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css'
})
export class MyBookingComponent implements OnInit {
  bookings: Booking[] = [];
  bookingsInv:Bookinginvestor[]=[]
  errorMessage: string = '';
  role: string | null = localStorage.getItem('role'); // Assuming 'role' is stored in localStorage

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetch bookings based on user role (Investor or Startup)
    this.getBookings();
  }

  getBookings(): void {
    if (this.role === 'ROLE_INVESTOR') {
      this.apiService.getBookingsForInvestor().subscribe({
        next: (data) => {
          this.bookings = data;
          console.log('Investor Bookings:', data);
        },
        error: (err) => {
          console.error('Error fetching investor bookings:', err);
        }
      });
    } else if (this.role === 'ROLE_STARTUP_FOUNDER') {
      this.apiService.getBookingsForStartup().subscribe({
        next: (data) => {
          this.bookingsInv = data;
          console.log('Startup Founder Bookings:', data);
        },
        error: (err) => {
          console.error('Error fetching startup bookings:', err);
        }
      });
    } else if (this.role === 'ROLE_INCUBATOR') {
      this.apiService.getBookingsForIncubator().subscribe({
        next: (data) => {
          this.bookings = data;
          console.log('Incubator Bookings:', data);
        },
        error: (err) => {
          this.errorMessage = 'Error fetching incubator bookings';
          console.error('Error fetching incubator bookings:', err);
        }
      });
    } else if (this.role === 'ROLE_PRE_SEED') {
      this.apiService.getBookingsForPreSeed().subscribe({
        next: (data) => {
          this.bookings = data;
          console.log('Preseed Bookings:', data);
        },
        error: (err) => {
          this.errorMessage = 'Error fetching preseed bookings';
          console.error('Error fetching preseed bookings:', err);
        }
      });
    } else {
      this.errorMessage = 'User role is not recognized';
    }
  }
  
}
