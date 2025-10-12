import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { RestaurantsComponent } from './components/restaurants/restaurants';
import { CartComponent } from './components/cart/cart';
import { AuthComponent } from './components/auth/auth';
import { ProfileComponent } from './components/profile/profile';
import { MenuComponent } from './components/menu/menu';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'restaurants/:id/menu', component: MenuComponent },
  { 
    path: 'cart', 
    component: CartComponent,
    canActivate: [authGuard]
  },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];
