import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  codeBar = '7622210204424';
  prod ;
  constructor(private service: ApiService) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.service.getData(this.codeBar).subscribe(e => {
      console.log(e['product']);
      this.prod = e['product'];
    });
  }

  logRatingChange(e) {
    console.log(e.newValue)
  }
}
