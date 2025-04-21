import { Routes } from '@angular/router';
import { EpisodesComponent } from './episodes/episodes.component';
import { LoginComponent } from './login/login.component';
import { CharactersComponent } from './characters/characters.component';
import { HomeAnimationComponent } from './home-animation/home-animation.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: 'episodes', component: EpisodesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'animation', component: HomeAnimationComponent },
  { path: 'profile', component: ProfileComponent },
];
