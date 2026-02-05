import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GestionePersonaleComponent } from './components/gestione-personale/gestione-personale.component';
import { GestioneRifiutiComponent } from './components/gestione-rifiuti/gestione-rifiuti.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'personale', component: GestionePersonaleComponent },
    { path: 'rifiuti', component: GestioneRifiutiComponent },
];
