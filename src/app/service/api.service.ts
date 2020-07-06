import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  protected lien;
  constructor(private http: HttpClient) {
    this.lien = 'https://degrassi-crown-08212.herokuapp.com/';
   }

  // getData(barCode) {
  //   return this.http.get(environment.api + barCode + '.json')
  // }

  // searchProductByName(productName) {
  //   return this.http.get(environment.search_api + productName + '&page_size=50&json=1')
  // }*
  

  dataByBarcode(code) {
    return this.http.get(this.lien + 'products/' + code)
  }
  dataByTitle(brand, pageSize, page) {
    return this.http.get(this.lien + 'products?search=' + brand + '&page_size=' + pageSize + '&page=' + page);
  }
  postReview(code, body){
    return this.http.post(this.lien + 'products/' + code + '/reviews', body)
  }
  getReviews(code, page) {
    return this.http.get(this.lien + 'products/' + code + '/reviews' + '?page=' + page)
  }
}
