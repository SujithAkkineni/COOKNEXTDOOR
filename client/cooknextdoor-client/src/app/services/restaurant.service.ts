import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  address: string;
  rating: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:5001/api/restaurants';

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/${id}`);
  }

  searchRestaurants(query: string, cuisine: string): Observable<Restaurant[]> {
    let url = this.apiUrl + '/search?';
    if (query) {
      url += `q=${query}`;
    }
    if (cuisine) {
      url += `${query ? '&' : ''}cuisine=${cuisine}`;
    }
    return this.http.get<Restaurant[]>(url);
  }
}