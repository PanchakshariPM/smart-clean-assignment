import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  // Request to get the local JSON file.
  getJsonFile() {
    return this.httpClient.get('assets/json.json').toPromise();
  }
}
