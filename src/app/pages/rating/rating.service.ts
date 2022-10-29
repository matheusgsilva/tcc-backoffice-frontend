import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/app/shared/api.urls';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  save(body: any, companyguid: string) {
    return this.http.post(environment.url + API_ENDPOINTS.RATING.SAVE + companyguid, body);
  }
}
