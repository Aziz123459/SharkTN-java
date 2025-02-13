import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { ApiService } from '../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { UploadService } from '../services/upload.service';
@Component({
  selector: 'app-user-form',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  new: User = {}; 
  errorMessage: any = {};
  selectedFile: File[] = [];

  image_urls: string[] = [];
  isUploading: boolean = false;

  constructor(private apiService: ApiService, private router: Router,private uploadService: UploadService) {}

  createUser(): void {
    console.log("image : ",this.image_urls[0]);
    
    this.new = {
      ...this.new,
      profile: this.image_urls[0],
    };
    console.log("****************",this.new);
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
