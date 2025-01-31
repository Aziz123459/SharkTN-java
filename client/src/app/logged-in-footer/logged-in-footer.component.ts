import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-logged-in-footer',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './logged-in-footer.component.html',
  styleUrl: './logged-in-footer.component.css'
})
export class LoggedInFooterComponent {

}
