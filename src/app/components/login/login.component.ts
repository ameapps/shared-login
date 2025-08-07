import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { CommonService } from '../../shared/services/common/common.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: User = {
    username: '',
    email: '',
    password: ''
  }
  error = '';
  showPassword = false;

  constructor(private router: Router, public common:CommonService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.user.username || !this.user.password) {
      this.error = 'Inserisci nome utente e password.';
      return;
    }
    this.common.lastLoggedUser = this.user;
    this.error = '';
    // La logica di navigazione sarà gestita dal componente principale
    this.router.navigate(['/products']);
  }

  forgotPassword() {
    this.router.navigate(['/forgot']);
  }

  register() {
    this.router.navigate(['/register']);
  }
}
