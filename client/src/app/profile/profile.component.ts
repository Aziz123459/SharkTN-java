import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Startup } from '../startup';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';
import { Investor } from '../investor';


@Component({
  selector: 'app-profile',
  imports: [CommonModule,RouterModule,HomeNavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  role: string | null = null;
  user : User ={}
  dataStartup : Startup ={}
  dataInvestor : Investor ={}
  userId: string | null = null;


  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.role= localStorage.getItem('role');
    this.userId= localStorage.getItem('userId');
    console.log("userId : "+ this.userId);
    console.log("role : "+this.role);
    
    if (this.userId) {
      this.apiService.getuser(this.userId).subscribe({
        next: (data) => {this.user = data[0],console.log(data );
        },
        error: err => console.error("Error fetching user:", err)
      })
      if (this.role == "ROLE_STARTUP_FOUNDER") {
        this.apiService.getstartupByUserId(this.userId).subscribe({
          next: (data) => {this.dataStartup = data; 
            console.log(data);            
          },
          error: err => console.error("Error fetching startup:", err)
        })
      }
      if (this.role == "ROLE_INVESTOR") {
        this.apiService.getInvestorById(this.userId).subscribe({
          next: (data) => {this.dataInvestor = data; console.log(data);
          },
          error: err => console.error("Error fetching investor:", err)
        })
      }
    }
  }
  
  calculateAge(dateOfBirth?: string): number {
    // Provide a default value if dateOfBirth is undefined
    const dob = new Date(dateOfBirth || "2000-01-01T00:00:00.000+00:00");
    const today = new Date();
  
    // Handle future dates
    if (dob > today) {
      throw new Error("Date of birth is in the future!");
    }
  
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
  
    return age;
  }

  // onSubmitUpdate(): void {
  //   const updateData Partial<User> = {
  //     firstName: this.user.firstName,
  //     lastName: this.user.lastName,
  //     dateOfBirth: this.user.dateOfBirth,
  //     phoneNumber: this.user.phoneNumber
  //   };
  
  //   this.apiService.updateUser(updateData).subscribe({
  //     next: (response) => {
  //       console.log('User updated successfully:', response);
  //     },
  //     error: (err) => {
  //       console.error('Error updating user:', err);
  //     }
  //   });
  // }
  
}
