import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

bootstrapApplication(AppComponent, { 
  providers: [provideHttpClient(), ...appConfig.providers, provideAnimations(), MessageService]})
  .catch((err) => console.error(err));
