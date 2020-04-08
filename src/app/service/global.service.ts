import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  productReviews = [];
  favoris = [];
  historique =[];
  
  constructor() { }
}
