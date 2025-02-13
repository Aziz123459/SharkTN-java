import { Component } from '@angular/core';
import { Investor } from '../investor';
import { Startup } from '../startup';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';
import { User } from '../user';
import { PreSeed } from '../pre-seed';
import { Incubator } from '../incubator';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, RouterModule, FormsModule, HomeNavbarComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  role: string | null = null;
  user : User ={}
  dataStartup : Startup ={}
  dataInvestor : Investor ={}
  dataPreSeed : PreSeed={}
  dataIncubator : Incubator={}
  userId: string | null = null;
  errorMessage: any={}
  selectedFile: File[] = [];

  image_urls: string[] = [];
  isUploading: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService,private uploadService: UploadService) {}
    
    ngOnInit(): void {
      this.role= localStorage.getItem('role');
      this.userId= localStorage.getItem('userId');
      console.log(this.userId);
      
      if (this.userId) {
        this.apiService.getuser(this.userId).subscribe({
          next: (data) => {this.user = data[0],console.log(data );
          },          
          error: err => console.error("Error fetching user:", err)
        })
      if(this.role == "ROLE_STARTUP_FOUNDER"){
        this.apiService.getstartupByUserId(this.userId).subscribe({
          next: (data) => {this.dataStartup = data; console.log(data);
          },
          error: err => console.error("Error fetching startup:", err)
        })
      }
      if(this.role == "ROLE_INVESTOR"){
        this.apiService.getInvestorById(this.userId).subscribe({
          next: (data) => {this.dataInvestor = data; console.log(data);
          },
          error: err => console.error("Error fetching investor:", err)
        })
      }
      if(this.role == "ROLE_PRE_SEED"){
        this.apiService.getPreseedByUserId(this.userId).subscribe({
          next: (data) => {this.dataPreSeed = data; console.log(data);
          },
          error: err => console.error("Error fetching preseed:", err)
        })
      }
    }
  }

  updateProfile():void{
    const data1={id:this.user.id,fullname:this.user.fullname,phone:this.user.phone,adress:this.user.adress}
    this.apiService.updateUser(data1).subscribe({
      next:res=>this.router.navigate([`/profile/${this.userId}`]),
      error:err=>this.errorMessage=err
    })

    if(this.role=="ROLE_STARTUP_FOUNDER"){
      const data2={
        id:this.dataStartup.id,
        startupName:this.dataStartup.startupName,
        teamNumber:this.dataStartup.teamNumber,
        industry:this.dataStartup.industry,
        briefDescription:this.dataStartup.briefDescription,
        businessRegistrationNumber:this.dataStartup.businessRegistrationNumber,
        uploadGovernmentIssuedID:this.image_urls[0],
        uploadBusinessRegistrationCertificate:this.image_urls[1]
      }
      // console.log("data2 : ",data2);
      // console.log("data2 uploadGovernmentIssuedID : ",data2.uploadGovernmentIssuedID);
      // console.log("isUploading :", this.image_urls);
      
      
      this.apiService.updateStartup(data2).subscribe({
        next:res=>this.router.navigate([`/profile/${this.userId}`]),

        error:err=>this.errorMessage=err
      })
      if (this.dataStartup.status == 2) {
        console.log("from edit", this.dataStartup.id);
        
        this.apiService.getStartupBackToPending(this.dataStartup.id).subscribe(
          {
            next:res=>console.log("working")
            ,
    
            error:err=>this.errorMessage=err
          }
        )
      }
    }
    if(this.role=="ROLE_INVESTOR"){
      const data3={id:this.dataInvestor.id,investmentAmount:this.dataInvestor.investmentAmount,message:this.dataInvestor.message}
      this.apiService.updateInvestor(data3).subscribe({
        next:res=>this.router.navigate([`/profile/${this.userId}`]),
        error:err=>this.errorMessage=err
      })
    }
    if(this.role=="ROLE_PRE_SEED"){
      const data4={id:this.dataPreSeed.id,projectName:this.dataPreSeed.projectName}
      this.apiService.updatePreseed(data4).subscribe({
        next:res=>this.router.navigate([`/profile/${this.userId}`]),
        error:err=>this.errorMessage=err
      })
    }
  }

  async onFileSelected(event: any, idx: number) {
    this.selectedFile[idx] = event.target.files[0];
    if (this.selectedFile) {
      this.isUploading = true;
      try {
        this.image_urls[idx] = await this.uploadService.uploadImage(this.selectedFile[idx]);
        console.log(this.image_urls);
      } catch (error) {
        console.error('Upload failed', error);
      }
      this.isUploading = false;
    }
  }

  async uploadImg(f: File): Promise<String> {
    let url: string | null = ""
    try {
      url = await this.uploadService.uploadImage(f);
      console.log(url);
      return url!
    } catch (error) {
      console.error('Upload failed', error);
      return "Upload failed"
    }
  }

}
