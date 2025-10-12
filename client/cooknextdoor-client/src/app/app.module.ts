import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app';
import { AuthComponent } from './components/auth/auth';
import { CartComponent } from './components/cart/cart';
import { HomeComponent } from './components/home/home';
import { MenuComponent } from './components/menu/menu';
import { ProfileComponent } from './components/profile/profile';
import { RestaurantsComponent } from './components/restaurants/restaurants';

// Import services
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { RestaurantService } from './services/restaurant.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    AppComponent,
    AuthComponent,
    CartComponent,
    HomeComponent,
    MenuComponent,
    ProfileComponent,
    RestaurantsComponent
  ],
  providers: [
    AuthService,
    CartService,
    RestaurantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }