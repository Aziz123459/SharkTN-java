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

  // Add FormGroups for stepper
  investorFormGroup!: FormGroup;
  startupFormGroup!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
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

  onFileSelected(event: any, idx: number): void {
    this.selectedFile[idx] = event.target.files[0];
  }

  submitStartup(): void {
    if (this.startupData) {
      this.startupData = {
        ...this.startupData,
        startupLogo: this.selectedFile[0].name,
        uploadGovernmentIssuedID: this.selectedFile[1].name,
        uploadBusinessRegistrationCertificate: this.selectedFile[2].name,
      };
      this.startupData.userId = this.userId;
      this.apiService.creatStartup(this.startupData).subscribe({
        next: (response) => {
          if (this.selectedFile.length > 0) {
            this.selectedFile.forEach((file) => {
              this.apiService.uploadImage(file).subscribe({
                next: (res) => console.log('Image uploaded successfully:', res),
                error: (err) => console.error('Error uploading image:', err),
              });
            });
          }
          console.log('Startup created successfully:', response);
          this.router.navigate(['/home', this.type]);
        },
        error: (err) => {
          console.error('Error creating startup:', err);
        },
      });
    }
  }
}
