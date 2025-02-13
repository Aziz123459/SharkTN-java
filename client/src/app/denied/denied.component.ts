import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-denied',
  imports: [CommonModule],
  templateUrl: './denied.component.html',
  styleUrl: './denied.component.css'
})
export class DeniedComponent {
  userId: string | null = null;

  ngOnInit(): void {
      this.userId= localStorage.getItem('userId');
  }
}
