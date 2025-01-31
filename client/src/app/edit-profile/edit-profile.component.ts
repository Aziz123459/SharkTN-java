import { Component } from '@angular/core';
import { Investor } from '../investor';
import { Startup } from '../startup';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';
import { User } from '../user';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, RouterModule, FormsModule, HomeNavbarComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  type: string | null = null;
  user : User ={}
  dataStartup : Startup ={}
  dataInvestor : Investor ={}
  userId: string | null = null;
  errorMessage: any={}

    constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {}
    
    ngOnInit(): void {
      this.type= localStorage.getItem('acctype');
      this.userId= localStorage.getItem('userId');
      console.log(this.userId);
      
      if (this.userId) {
        this.apiService.getuser(this.userId).subscribe({
          next: (data) => this.user = data,
          error: err => console.error("Error fetching user:", err)
        })
      if(this.type == "startup"){
        this.apiService.getstartupByUserId(this.userId).subscribe({
          next: (data) => {this.dataStartup = data[0]; console.log(data);
          },
          error: err => console.error("Error fetching startup:", err)
        })
      }
      else{
        this.apiService.getInvestorById(this.userId).subscribe({
          next: (data) => {this.dataInvestor = data[0]; console.log(data);
          },
          error: err => console.error("Error fetching investor:", err)
        })
      }
    }
  }

  updateProfile():void{
    const data1={id:this.user.id,fullname:this.user.fullname,phone:this.user.phone,address:this.user.adress}
    this.apiService.updateUser(data1).subscribe({
      next:res=>this.router.navigate([`/profile/${this.userId}`]),
      error:err=>this.errorMessage=err
    })

    if(this.type=="startup"){
      const data2={id:this.dataStartup.id,startupName:this.dataStartup.startupName,teamNumber:this.dataStartup.teamNumber,Industry:this.dataStartup.Industry,BriefDescription:this.dataStartup.BriefDescription}
      this.apiService.updateStartup(data2).subscribe({
        next:res=>this.router.navigate([`/profile/${this.userId}`]),

        error:err=>this.errorMessage=err
      })
    }
    else{
      const data3={id:this.dataInvestor.id,investmentAmount:this.dataInvestor.investmentAmount,message:this.dataInvestor.message}
      this.apiService.updateInvestor(data3).subscribe({
        next:res=>this.router.navigate([`/profile/${this.userId}`]),
        error:err=>this.errorMessage=err
      })
    }
  }

}
