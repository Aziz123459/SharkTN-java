import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Startup } from '../startup';
import { Investor } from '../investor';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../services/api.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-choice-form',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './choice-form.component.html',
  styleUrls: ['./choice-form.component.css'],
})
export class ChoiceFormComponent implements OnInit {
  type: 'ROLE_INVESTOR' | 'ROLE_STARTUP_FOUNDER' | null = null;
  investorData: Investor = {};
  startupData: Startup = {};
  // errorMessage: string | null = null;
  userId: string | null = null;
  selectedFile: File[] = [];

  image_urls: string[] = [];
  isUploading: boolean = false;

  // Add FormGroups for stepper
  investorFormGroup!: FormGroup;
  startupFormGroup!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private uploadService: UploadService,
    private fb: FormBuilder // FormBuilder for FormGroup initialization
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type') as 'ROLE_INVESTOR' | 'ROLE_STARTUP_FOUNDER';
    this.userId = localStorage.getItem('userId');

    // Initialize FormGroups
    this.investorFormGroup = this.fb.group({
      investorEmail: ['', [Validators.required, Validators.email]],
      investmentAmount: ['', [Validators.required, Validators.min(1)]],
      message: ['', Validators.maxLength(500)],
      businessRegistrationNumber: ['', Validators.required],
    });

    this.startupFormGroup = this.fb.group({
      startupName: ['', Validators.required],
      startupEmail: ['', [Validators.required, Validators.email]],
      teamNumber: ['', Validators.required],
      briefDescription: ['', Validators.maxLength(500)],
      industry: ['', Validators.required],
      businessRegistrationNumber: ['', Validators.required],
      uploadGovernmentIssuedID:['', Validators.required],
      startupLogo:['', Validators.required],
      uploadBusinessRegistrationCertificate:['',Validators.required]
    });
  }

  submitInvestor(): void {
    if (this.investorData) {
      this.investorData.userId = this.userId;
      this.apiService.creatInvestor(this.investorData).subscribe({
        next: (response) => {
          console.log('Investor created successfully:', response);
          this.router.navigate(['/home', this.type]);
        },
        error: (err) => {
          console.error('Error creating investor:', err);
        },
      });
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

  submitStartup(): void {
    if (this.startupData) {
      // for loop, call the service, the service will return the image url
      // this.selectedFile.forEach((file,idx) => {
      //   try {
      //     this.image_url = await this.uploadService.uploadImage(this.selectedFile[idx]);
      //     console.log(this.image_url);
      //   } catch (error) {
      //     console.error('Upload failed', error);
      //   }
      //         });
            };
      this.startupData = {
        ...this.startupData,
        startupLogo: this.image_urls[0],
        uploadGovernmentIssuedID: this.image_urls[1],
        uploadBusinessRegistrationCertificate: this.image_urls[2],
      };
      this.startupData.userId = this.userId;
      this.apiService.creatStartup(this.startupData).subscribe({
        next: (response) => {
          console.log('Startup created successfully:', response);
          this.router.navigate(['/home', this.type]);
        },
        error: (err) => {
          console.error('Error creating startup:', err);
        },
      });
    }
  
}
