import { Component } from '@angular/core';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';
import { User } from '../user';
import { Investor } from '../investor';
import { Startup } from '../startup';
import { Incubator } from '../incubator';
import { PreSeed } from '../pre-seed';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'app-requests',
  imports: [HomeNavbarComponent, CommonModule, RouterModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {
    users: User[] = [];
    startups: User[] = [];
    investors: User[] = [];
    incubators: User[] = [];
    preseeds: User[] = [];
    user:User = {};
    investor:Investor={};
    startup:Startup={};
    incubator:Incubator={};
    pressed:PreSeed={};
    id: string | undefined |null;
    selectedImage: string = '';
    selectedTitle: string = '';


    constructor(private apiService: ApiService, private route: ActivatedRoute,
      private router: Router,) {}

      ngOnInit(): void {
        this.id= this.route.snapshot.paramMap.get('id');

        this.apiService.getuser(this.id!).subscribe({
        next: (data) => {this.user = data[0],console.log(data );
        },
        error: err => console.error("Error fetching user:", err)
      })
        this.apiService.getstartupByUserId(this.id).subscribe({
          next: (data: Startup) => (this.startup = data),
          error: (err) => console.error('Error fetching startup details:', err)
        });

      }

      acceptStartup(): void {
        this.apiService.acceptStartup(this.startup.id).subscribe({
          next: () => {            
            this.router.navigate(['/admin-requests']);
          },
          error: (err) => {            
            console.error('Error accepting startup:', err);
          }
        });
      }
      
      denyStartup(): void {
        this.apiService.denyStartup(this.startup.id).subscribe({
          next: () => {            
            this.router.navigate(['/admin-requests']);
          },
          error: (err) => {            
            console.error('Error accepting startup:', err);
          }
        });
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

      openImageModal(imageUrl: string, title: string) {
        this.selectedImage = imageUrl;
        this.selectedTitle = title;
        const modalElement = document.getElementById('imageModal');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }

}
