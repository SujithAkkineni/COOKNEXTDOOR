import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { MenuService, MenuItem } from '../../services/menu.service';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatSnackBarModule
  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  categories: string[] = [];
  restaurantId: string = '';
  restaurantName: string = '';

  constructor(
    private menuService: MenuService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.restaurantId = this.route.snapshot.params['id'];
    this.loadMenu();
  }

  loadMenu() {
    this.menuService.getRestaurantMenu(this.restaurantId).subscribe({
      next: (items) => {
        this.menuItems = items;
        this.categories = [...new Set(items.map(item => item.category))];
      },
      error: (error) => {
        console.error('Error loading menu:', error);
        this.snackBar.open('Error loading menu items', 'Close', {
          duration: 3000
        });
      }
    });
  }

  getItemsByCategory(category: string): MenuItem[] {
    return this.menuItems.filter(item => item.category === category);
  }

  addToCart(item: MenuItem) {
    this.cartService.addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: this.restaurantId,
      restaurantName: this.restaurantName
    });

    this.snackBar.open(`${item.name} added to cart`, 'Close', {
      duration: 2000
    });
  }
}