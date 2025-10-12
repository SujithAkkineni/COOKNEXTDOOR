import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule, 
    MatFormFieldModule,
    MatTabsModule
  ]
})
export class ProfileComponent {
  user: any; // Replace with proper User interface
  editMode = false;
  loading = false;
  orders: any[] = []; // Replace with proper Order interface

  constructor() {
    // Initialize user and orders from a service
    this.user = {
      name: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      }
    };
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  onSaveProfile(): void {
    this.loading = true;
    // Call your service to save the profile
    setTimeout(() => {
      this.loading = false;
      this.editMode = false;
    }, 1000);
  }
}
