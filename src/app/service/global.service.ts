import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  codebar = '';
  productReviews = [];
  favoris = [];
  historique = [];
  moyenneScore = 0;

  constructor() { }
}
