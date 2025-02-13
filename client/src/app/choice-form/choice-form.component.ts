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
import { Incubator } from '../incubator';
import { PreSeed } from '../pre-seed';
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
  type: 'ROLE_INVESTOR' | 'ROLE_STARTUP_FOUNDER'|'ROLE_INCUBATOR' | 'ROLE_PRE_SEED'| null = null;
  investorData: Investor = {};
  startupData: Startup = {};
  incubatorData:Incubator={};
  preSeedData:PreSeed={};
  userId: string | null = null;
  selectedFile: File[] = [];

  image_urls: string[] = [];
  isUploading: boolean = false;

  // Add FormGroups for stepper
  investorFormGroup!: FormGroup;
  startupFormGroup!: FormGroup;
  incubatorFormGroup!:FormGroup;
  preSeedFormGroup!:FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private uploadService: UploadService,
    private fb: FormBuilder // FormBuilder for FormGroup initialization
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type') as 'ROLE_INVESTOR' | 'ROLE_STARTUP_FOUNDER'|'ROLE_INCUBATOR'| 'ROLE_PRE_SEED';
    this.userId = localStorage.getItem('userId');

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

    this.incubatorFormGroup=this.fb.group({
      email:['', Validators.required],
      message:['', Validators.required]
    })
    this.preSeedFormGroup=this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field with validation
      projectName: ['', Validators.required], // Project name field
      discription: ['', Validators.required], // Description field
      problemSolve: ['', Validators.required], // Problem being solved field
      
    })
  }

  submitInvestor(): void {
    if (this.investorData) {
      this.investorData.userId = this.userId;
      this.apiService.creatInvestor(this.investorData).subscribe({
        next: (response) => {
          console.log('Investor created successfully:', response);
          if (response.status === 0) {
            this.router.navigate(['/pending']);
          } else {
            this.router.navigate(['/home', this.type]);
          }
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
          console.log('response.status:', response.status);
          console.log('this.startupData.status:', this.startupData.status);

          if (response.status === 0) {
            this.router.navigate(['/pending']);
          } else {
            this.router.navigate(['/home', this.type]);
          }
        },
        error: (err) => {
          console.error('Error creating startup:', err);
        },
      });
    }
  
  submitIncubator(): void {
    if (this.incubatorData) {
      this.incubatorData.userId = this.userId;
      this.apiService.creatIncubator(this.incubatorData).subscribe({
        next: (response) => {
          console.log('incubator created successfully:', response);
          if (response.status === 0) {
            this.router.navigate(['/pending']);
          } else {
            this.router.navigate(['/home', this.type]);
          }
        },
        error: (err) => {
          console.error('Error creating investor:', err);
        },
      });
    }
  }
  submitPreSeed(): void {
    if (this.preSeedData) {
      this.preSeedData.userId = this.userId; // Set the userId for the pre-seed investment
      this.apiService.createPreSeed(this.preSeedData).subscribe({
        next: (response) => {
          console.log('Pre-seed created successfully:', response);
          if (response.status === 0) {
            this.router.navigate(['/pending']); // Navigate to pending if status is 0
          } else {
            this.router.navigate(['/home', this.type]); // Navigate to home with type
          }
        },
        error: (err) => {
          console.error('Error creating pre-seed:', err); // Log any errors
        },
      });
    }
  }
}
