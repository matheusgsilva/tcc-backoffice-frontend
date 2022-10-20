import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/app/shared/api.urls';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  delete(guid: string) {
    return this.http.delete(environment.url + API_ENDPOINTS.RATING.DELETE + guid);
  }

  list(companyGuid: string) {
    return this.http.get(environment.url + API_ENDPOINTS.RATING.LIST + companyGuid);
  }
}
