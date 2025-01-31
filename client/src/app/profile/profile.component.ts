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
  type: string | null = null;
  user : User ={}
  dataStartup : Startup ={}
  dataInvestor : Investor ={}
  userId: string | null = null;


  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.type= localStorage.getItem('acctype');
    this.userId= localStorage.getItem('userId');
    console.log(this.userId);
    
    if (this.userId) {
      this.apiService.getuser(this.userId).subscribe({
        next: (data) => this.user = data,
        error: err => console.error("Error fetching user:", err)
      })
    
      this.apiService.getstartupByUserId(this.userId).subscribe({
        next: (data) => {this.dataStartup = data[0]; console.log(data);
        },
        error: err => console.error("Error fetching startup:", err)
      })

      this.apiService.getInvestorById(this.userId).subscribe({
        next: (data) => {this.dataInvestor = data[0]; console.log(data);
        },
        error: err => console.error("Error fetching investor:", err)
      })
    }
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
