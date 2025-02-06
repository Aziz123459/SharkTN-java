import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { ApiService } from '../services/api.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-user-form',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  new: User = {}; 
  errorMessage: any = {};

  constructor(private apiService: ApiService, private router: Router) {}

  createUser(): void {
    this.apiService.createUser(this.new).subscribe({
      next: (res) => {
        console.log(res);
        
        const userType = res.role ; 
        localStorage.setItem("token", res.token)
        localStorage.setItem("userId", res.id)
        localStorage.setItem("role", res.role)
        this.router.navigate(['/new', userType], {
          state: { userType: res } 
        });
        // this.router.navigate(['/'])
      },
      error: (err) => {
        console.log(this.new);
        
        this.errorMessage = err;
      }
    });
  }
}
