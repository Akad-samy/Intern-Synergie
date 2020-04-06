import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  codeBar = '7622210204424';
  prod = '';
  constructor(private service: ApiService, public gService: GlobalService) {}

  ngOnInit() {
    this.getProduct();
    // this.gService.hideImgs=false;
  }

  getHideImgs() {
    return this.gService.hideImgs;
  }

  getProduct() {
    this.service.getData(this.codeBar).subscribe((e) => {
      console.log(e['product']);
      this.prod = e['product'];
    });
  }

  logRatingChange(e) {
    console.log(e.newValue);
  }
}
