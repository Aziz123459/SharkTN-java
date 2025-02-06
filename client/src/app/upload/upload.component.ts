import { Component } from '@angular/core';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  isUploading = false;

  constructor(private uploadService: UploadService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (!this.selectedFile) {
      alert('Please select a file first.');
      return;
    }

    this.isUploading = true;

    this.uploadService.uploadImage(this.selectedFile).subscribe({
      next: (response) => {
        this.imageUrl = response.secure_url; // Cloudinary provides the URL
        this.isUploading = false;
        alert('Upload successful!');
      },
      error: (error) => {
        console.error('Upload failed:', error);
        this.isUploading = false;
        alert('Upload failed. Please try again.');
      }
    });
  }
}
