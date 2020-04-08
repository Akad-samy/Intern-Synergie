import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { GlobalService } from 'src/app/service/global.service';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  codeBar = '7622210204424'; // 3116430208941
  prod = '';
  constructor(
    private apiService: ApiService,
    public globalService: GlobalService
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.apiService.getData(this.codeBar).subscribe((e) => {
      console.log(e['product']);
      this.prod = e['product'];
      this.saveProducts(e['product']);
    });
  }

  saveProducts(item) {
    this.globalService.historique.unshift(item);

    const json = JSON.stringify(this.globalService.historique);
    console.log(json);

    Storage.set({
      key: 'historique',
      value: json,
    })
      .then((res) => {
        console.log('data stored : ' + res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // logRatingChange(e) {
  //   console.log(e.newValue);
  // }
}
