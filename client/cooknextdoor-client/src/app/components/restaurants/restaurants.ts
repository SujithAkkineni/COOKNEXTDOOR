import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { RestaurantService, Restaurant } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.html',
  styleUrls: ['./restaurants.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  searchQuery: string = '';
  selectedCuisine: string = '';
  cuisines: string[] = ['Italian', 'Indian', 'Chinese', 'Mexican', 'Japanese'];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.restaurantService.getRestaurants().subscribe(
      (data) => {
        this.restaurants = data;
        this.filteredRestaurants = data;
      },
      (error) => {
        console.error('Error loading restaurants:', error);
      }
    );
  }

  onSearch() {
    this.restaurantService
      .searchRestaurants(this.searchQuery, this.selectedCuisine)
      .subscribe(
        (data) => {
          this.restaurants = data;
          this.filteredRestaurants = data;
        },
        (error) => {
          console.error('Error searching restaurants:', error);
        }
      );
  }

}
