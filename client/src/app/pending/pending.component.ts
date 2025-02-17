import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';

@Component({
  selector: 'app-pending',
  imports: [CommonModule, HomeNavbarComponent],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.css'
})
export class PendingComponent {

}
