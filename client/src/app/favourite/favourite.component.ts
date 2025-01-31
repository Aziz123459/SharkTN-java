import { Component } from '@angular/core';
import { Investor } from '../investor';
import { Startup } from '../startup';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { Favorite } from '../favorite';

@Component({
  selector: 'app-favourite',
  imports: [CommonModule],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css'
})
export class FavouriteComponent {

}
