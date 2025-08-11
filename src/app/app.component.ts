import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseService as FirebaseService } from './shared/services/firebase/firebase.service';
import { AssetsService } from './shared/services/assets/assets.service';
import { FirebaseConfig } from './shared/models/firebaseConfig';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonService } from './shared/services/common/common.service';
import { lastValueFrom } from 'rxjs';
import { DefaultConfig } from './shared/models/default.config.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'shared-login';
  username = '';
  password = '';
  error = '';
  showPassword = false;

  constructor(
    private common_service: CommonService,
    private fb_service: FirebaseService,
    private http_service: HttpClient
  ) {}

  async ngOnInit() {
    // 01. Recupero la configurazione Firebase
    const fbConfig: FirebaseConfig | undefined =
      await this.fb_service.getFirebaseConfig('ame.dev.apps');
    if (!fbConfig) {
      console.error('Errore nel recupero della configurazione Firebase.');
      return;
    }
    console.log('Configurazione Firebase:', fbConfig);
    const fbApi: boolean = this.fb_service.startFbApi(fbConfig);
    if (!fbApi) {
      console.error("Errore nell'inizializzazione dell'API Firebase.");
      return;
    }
    //02. Recupero la configurazione dell'applicazione
    const appConfig: DefaultConfig = await this.loadAppConfig();
    this.common_service.appConfig = appConfig;
    console.log('Configurazione dell\'applicazione:', appConfig);
  }

  async loadAppConfig(): Promise<DefaultConfig> {
    const value = await lastValueFrom(
      this.http_service.get<DefaultConfig>('assets/config/default-config.json')
    );
    return value;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Inserisci nome utente e password.';
      return;
    }
    this.error = '';
    // Qui puoi aggiungere la logica di autenticazione
    alert(`Benvenuto, ${this.username}!`);
  }
}
