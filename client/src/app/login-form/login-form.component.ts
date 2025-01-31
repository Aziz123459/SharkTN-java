import { Component } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-form',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  new: User ={}
  errorMessage: any = {}
  
    constructor(private apiService: ApiService, private router: Router) {}
  
    login(): void {
      this.apiService.login(this.new).subscribe({
        next: (res) => {
          const userType = res.user.role 
          localStorage.setItem("token", res.token)
          localStorage.setItem("userId", res.user.id)
          localStorage.setItem("role", res.user.role)
          
          this.router.navigate(['/home',userType],{
            state: { userType:userType } 
          });
          // this.router.navigate(["/"]);
        },
        
        error: (err) =>{this.errorMessage = err
          console.error(err);
        } 
      })
    }
  

}
