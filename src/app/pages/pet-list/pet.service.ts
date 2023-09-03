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
    return this.http.post(environment.url + API_ENDPOINTS.PET.ADD + companyGuid, body);
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

  sendImageAsFormData(convertedImage: string): Promise<any> {
    const formData = new FormData();
    const blob = this.dataURItoBlob(convertedImage);
    formData.append('image', blob, 'image.jpg');

    return this.http.post(environment.urlImageServer, formData).toPromise();
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }
}
