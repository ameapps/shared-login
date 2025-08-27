import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { CommonService } from '../../shared/services/common/common.service';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';

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
    password: '',
    uId: '',
    sex: 'male'
  };
  error = '';
  showPassword = false;

  constructor(
    private router: Router,
    public common: CommonService,
    private fb_service: FirebaseService
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    if (!this.user.username || !this.user.password) {
      this.error = 'Inserisci nome utente e password.';
      return;
    }
    this.common.lastLoggedUser = this.user;
    this.error = '';
    //01. Tento il login con le credenziali fornite
    const loginResult = await this.fb_service.tryLogin(this.user);
    this.common.saveUserSession(loginResult ?? undefined);
    console.info('Credenziali Firebase:', loginResult);
    if (!loginResult) {
      this.error = 'Credenziali non valide. Riprova.';
      return;
    }
    //02. Imposto le credenziali dell'utente appena ricevute 
    this.common.lastLoggedUser.uId = loginResult.user.uid;
    this.common.lastLoggedUser.username = this.user.username;  
    this.common.lastLoggedUser.email = loginResult.user.email || '';
    //this.common.lastLoggedUser.sex = loginResult.user.sex ?? 'male'
    console.log('this.common.lastLoggedUser', this.common.lastLoggedUser);
    //TODO: integrare le info dell'utente loggato recupendo quelle mancanti dal db
    //03. Salvo la sessione dell'utente 
    //04. Accedo alla pagina dei prodotti
    this.router.navigate(['/products']);
  }

  forgotPassword() {
    this.router.navigate(['/forgot']);
  }

  register() {
    this.router.navigate(['/register']);
  }
}
