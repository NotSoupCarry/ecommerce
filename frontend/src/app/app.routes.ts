import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { CarelloUtenteComponent } from './components/user/carello-utente/carello-utente.component';
import { AggiungiProdottoComponent } from './components/admin/aggiungi-prodotto/aggiungi-prodotto.component';
import { ListaUtentiComponent } from './components/admin/lista-utenti/lista-utenti.component';
import { roleUserGuard } from './guards/roleUser.guard';
import { roleAdminGuard } from './guards/roleAdmin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  { path: 'carrello', component: CarelloUtenteComponent, canActivate: [roleUserGuard]},
  { path: 'admin/aggiungiProdotto', component: AggiungiProdottoComponent, canActivate: [roleAdminGuard] },
  { path: 'admin/listaUtenti', component: ListaUtentiComponent, canActivate: [roleAdminGuard] },
];
