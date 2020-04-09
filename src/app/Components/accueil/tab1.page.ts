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
  codeBar = '3116430208941'; // 3116430208941 // 3045140105502  // 7622210204424
  prod = '';
  setProd;

  constructor(
    private apiService: ApiService,
    public globalService: GlobalService
  ) {}

  // ngOnInit() {
  //   this.getProduct();
  //   console.log(this.globalService.historique)
  // }

  ionViewWillEnter() {
    this.getProduct();
  }
  // get product from codebar     this.globalService.codebar
  
  getProduct() {
    this.apiService.getData(this.globalService.codebar).subscribe((e) => {
      console.log(e['product']);
      this.prod = e['product'];
      this.setStorageData()
    });
    console.log(this.globalService.historique)
  }

   setStorageData(){
     // get data from storage

     Storage.get({key: 'historique'}).then((e) => {
      this.setProd = JSON.parse(e.value);
      console.log(e.value)
      if(this.setProd === null) {
        this.setProd = [this.prod];
      } else {
        this.setProd.unshift(this.prod);
      }

      // Remove duplicated products

      this.globalService.historique = this.setProd.reduce((acc, current) => {
        const x = acc.find(item => item._id === current._id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      // set data to storage

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
