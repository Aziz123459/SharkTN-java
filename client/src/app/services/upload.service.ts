import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private cloudName = 'dl7vjhuek'; // Your Cloudinary Cloud Name
  private uploadPreset = 'sharktn'; // Your Upload Preset

  constructor() { }

  async uploadImage(file: File): Promise<string> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset); // Required for unsigned uploads

    try {
      const response = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response.data.secure_url);

      return response.data.secure_url; // The uploaded image URL
    } catch (error) {
      console.error('Upload failed', error);
      return 'Upload failed';
    }
  }
}
