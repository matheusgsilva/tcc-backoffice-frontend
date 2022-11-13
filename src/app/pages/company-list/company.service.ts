import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/app/shared/api.urls';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  add(body: any) {
    return this.http.post(environment.url + API_ENDPOINTS.COMPANY.ADD, body);
  }

  update(body: any, guid: string) {
    return this.http.put(environment.url + API_ENDPOINTS.COMPANY.UPDATE + guid, body);
  }

  changePassword(body: any) {
    return this.http.post(environment.url + API_ENDPOINTS.COMPANY.CHANGE_PASS, body);
  }

  detail(guid: string) {
    return this.http.get(environment.url + API_ENDPOINTS.COMPANY.DETAIL + guid);
  }

  detailName(guid: string) {
    return this.http.get(environment.url + API_ENDPOINTS.COMPANY.DETAIL_NAME + guid);
  }

  authorize(guid: string) {
    return this.http.get(environment.url + API_ENDPOINTS.COMPANY.AUTHORIZE + guid);
  }

  unauthorize(guid: string) {
    return this.http.get(environment.url + API_ENDPOINTS.COMPANY.UNAUTHORIZE + guid);
  }

  queryCep(cep: string) {
    return this.http.get(environment.url + API_ENDPOINTS.COMPANY.CEP_CHECK + cep);
  }

  queryCnpj(cnpj: string) {
    return this.http.get(environment.url + API_ENDPOINTS.COMPANY.CNPJ_CHECK + cnpj);
  }

  delete(guid: string) {
    return this.http.delete(environment.url + API_ENDPOINTS.COMPANY.DELETE + guid);
  }

  list() {
    return this.http.get(environment.url + API_ENDPOINTS.COMPANY.LIST);
  }

  sendEmailAccess(guid: string) {
    return this.http.get(environment.url + API_ENDPOINTS.COMPANY.EMAIL_ACCESS + guid);
  }
}
