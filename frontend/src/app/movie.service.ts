import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // API URL
  private apiUrl = 'http://localhost:3000/recommend';

  constructor(private http: HttpClient) {}

  getRecommendation(data: {genre: string; duration: string;mood: string;
  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
