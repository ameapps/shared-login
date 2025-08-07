import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../shared/models/user.model';
import { CommonService } from '../../../shared/services/common/common.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  showPassword = false;
  user: User = new User();

  constructor(public common: CommonService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Handles user registration.
   * 
   * This function attempts to register a new user using the provided details.
   * On successful registration, it displays a success alert. If an error occurs
   * during the registration process, it logs the error to the console and 
   * displays an error alert to the user.
   * 
   * Note: The actual registration logic needs to be implemented.
   */

/*******  6702f4c6-2f12-41e0-90de-fe90203cafed  *******/  
  async register() {
    try {
      this.common.lastRegisteredUser = this.user;
      // Implementa la logica di registrazione qui
      alert('Registrazione completata con successo!');
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      // Gestisci l'errore di registrazione
      alert(
        'Si è verificato un errore durante la registrazione. Riprova più tardi.'
      );
    }
  }
}
