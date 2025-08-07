import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  showPassword = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async register() {
    try {
      // Implementa la logica di registrazione qui
      alert('Registrazione completata con successo!');
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      // Gestisci l'errore di registrazione
      alert('Si è verificato un errore durante la registrazione. Riprova più tardi.');
    }
  }

}
