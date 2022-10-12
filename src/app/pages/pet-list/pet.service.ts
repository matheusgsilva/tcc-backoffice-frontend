import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/app/shared/api.urls';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { }

  add(body: any, companyGuid: string) {
    return this.http.post(environment.url + API_ENDPOINTS.PET.ADD + "companyguid/" + companyGuid, body);
  }

  update(body: any, guid: string) {
    return this.http.put(environment.url + API_ENDPOINTS.PET.UPDATE + guid, body);
  }

  detail(guid: string) {
    return this.http.get(environment.url + API_ENDPOINTS.PET.DETAIL + guid);
  }

  delete(guid: string) {
    return this.http.delete(environment.url + API_ENDPOINTS.PET.DELETE + guid);
  }

  list(companyGuid: string) {
    return this.http.get(environment.url + API_ENDPOINTS.PET.LIST + companyGuid);
  }
}
