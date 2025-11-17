import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';
import { Preset } from '@primeuix/themes/types';
import { definePreset as primeDefinePreset } from '@primeuix/themes';

const MyPreset = primeDefinePreset(Aura, {
  semantic: {
        primary: {
            0: '#ffffff',
            10: '#f0eff0',
            50: '#eeedee',
            100: '#dedade',
            200: '#bdb6bd',
            300: '#9b919b',
            350: '#7a6d7a',
            400: '#6c5d6c',
            500: '#594859',
            600: '#504150',
            700: '#473a47',
            800: '#3e323e',
            900: '#352b35',
            950: '#2d242d' ,
        },
        surface: {
          0: '#ffffff !important',
            50: '#f6f5f6 !important',
            100: '#f6f5f6 !important',
            200: '#a99da9 !important',
            300: '#a99da9 !important',
            400: '#756775 !important',
            500: '#756775 !important',
            600: '#756775 !important',
            700: '#5d4c5d !important',
            800: '#5d4c5d !important',
            900: '#5d4c5d !important',
            950: '#5d4c5d !important' ,
        },

}})

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    providePrimeNG({
            theme: {
                preset: MyPreset
            }})
]
};


