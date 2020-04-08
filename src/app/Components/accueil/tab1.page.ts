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
  codeBar = '7622210204424'; // 3116430208941 // 3045140105502  // 7622210204424
  prod = '';

  constructor(
    private apiService: ApiService,
    public globalService: GlobalService
  ) {}

  ngOnInit() {
    this.getProduct();
    console.log(this.globalService.historique)
  }

  getProduct() {
    this.apiService.getData(this.codeBar).subscribe((e) => {
      console.log(e['product']);
      this.prod = e['product'];
      this.getStorageData()
    });
  }

   getStorageData(){
     Storage.get({key: 'historique'}).then((e) => {
      this.globalService.historique = JSON.parse(e.value);
      console.log(e.value)
      if(this.globalService.historique === null) {
        this.globalService.historique = [this.prod];
      } else {
        this.globalService.historique.push(this.prod);
      }
      Storage.set({
        key: 'historique',
        value: JSON.stringify(this.globalService.historique),
      })
        .then((res) => {
          console.log('data stored : ' + res);
        })
        .catch((err) => {
          console.log(err);
        });
      console.error(this.globalService.historique)
    })
  }

  // logRatingChange(e) {
  //   console.log(e.newValue);
  // }
}
