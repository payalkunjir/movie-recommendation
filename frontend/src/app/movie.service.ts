import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // API URL
  public apiUrl = environment.apiUrl+'/recommend';

  constructor(private http: HttpClient) {}

  getRecommendation(data: {genre: string; duration: string;mood: string;
  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
