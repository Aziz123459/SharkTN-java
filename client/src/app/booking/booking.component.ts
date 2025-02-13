import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, HomeNavbarComponent,RouterLink,FormsModule,RouterModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  newBooking: Booking = {} as Booking;
  role: 'ROLE_INVESTOR' | 'ROLE_STARTUP_FOUNDER' | 'ROLE_ADMIN' |'ROLE_INCUBATOR'|'ROLE_PRE_SEED'|undefined;
 // Assuming you have a date field in your booking model

  constructor(private route: ActivatedRoute,private router: Router,private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadBookings();
    this.role = localStorage.getItem('role') as 'ROLE_INVESTOR' | 'ROLE_STARTUP_FOUNDER' | 'ROLE_ADMIN'|'ROLE_INCUBATOR'|'ROLE_PRE_SEED';
    console.log(this.role);
    
  }

   // Fetch the correct bookings based on the user's role
   loadBookings(): void {
    if (this.role === 'ROLE_ADMIN') {
      this.apiService.getAllBookings().subscribe(
        (data) => this.bookings = data,
        (error) => console.error('Error fetching bookings', error)
      );
    } else if (this.role === 'ROLE_INVESTOR') {
      this.apiService.getBookingsForInvestor().subscribe(
        (data) => this.bookings = data,
        (error) => console.error('Error fetching investor bookings', error)
      );
    } else if (this.role === 'ROLE_STARTUP_FOUNDER') {
      this.apiService.getBookingsForStartup().subscribe(
        (data) => this.bookings = data,
        (error) => console.error('Error fetching startup bookings', error)
      );
    } else {
      console.warn('User role not recognized for fetching bookings');
    }
  }

  
  createBooking(): void {
    this.apiService.createBooking(this.newBooking,Number(this.route.snapshot.paramMap.get('id'))).subscribe((newBooking) => {
      console.log('New booking created:', newBooking);
      this.loadBookings();  // Refresh the list after creating a new booking
    });
  }
  createBooking2(): void {
    this.apiService.createBooking2(this.newBooking,Number(this.route.snapshot.paramMap.get('id'))).subscribe((newBooking) => {
      console.log('New booking created:', newBooking);
      this.loadBookings();  // Refresh the list after creating a new booking
    });
  }
  createBooking3(): void {
    this.apiService.createBooking3(this.newBooking,Number(this.route.snapshot.paramMap.get('id'))).subscribe((newBooking) => {
      console.log('New booking created:', newBooking);
      this.loadBookings();  // Refresh the list after creating a new booking
    });
  }
  createBooking4(): void {
    this.apiService.createBooking4(this.newBooking,Number(this.route.snapshot.paramMap.get('id'))).subscribe((newBooking) => {
      console.log('New booking created:', newBooking);
      this.loadBookings();  // Refresh the list after creating a new booking
    });
  }


  // Delete booking
  deleteBooking(id: number): void {
    this.apiService.deleteBooking(id).subscribe(() => {
      console.log('Booking deleted');
      this.loadBookings();  // Refresh the list after deletion
    });
  }
}
