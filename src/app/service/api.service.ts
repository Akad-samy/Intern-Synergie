import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData(barCode) {
    return this.http.get(environment.api + barCode + '.json')
  }

  searchProductByName(productName) {
    return this.http.get(environment.search_api + productName + '&page_size=50&json=1')
  }
}
