import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth';
import { CartComponent } from './components/cart/cart';
import { HomeComponent } from './components/home/home';
import { MenuComponent } from './components/menu/menu';
import { ProfileComponent } from './components/profile/profile';
import { RestaurantsComponent } from './components/restaurants/restaurants';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'menu/:id', component: MenuComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
