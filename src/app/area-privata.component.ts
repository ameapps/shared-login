import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-area-privata',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="private-area">
      <h2>Benvenuto nell'area privata!</h2>
      <p>Questa sezione è accessibile solo dopo il login.</p>
    </div>
  `,
  styleUrls: ['./area-privata.component.scss']
})
export class AreaPrivataComponent {}
