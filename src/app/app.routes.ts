import { Routes } from '@angular/router';
import { HomePage } from './home-page';

export const routes: Routes = [
  { path: '', component: HomePage, pathMatch: 'full' },
  { path: 'en', component: HomePage, data: { language: 'en' } },
  { path: 'ar', component: HomePage, data: { language: 'ar' } },
  { path: '**', redirectTo: '/en' },
];
