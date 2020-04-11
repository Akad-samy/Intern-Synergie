import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { GlobalService } from 'src/app/service/global.service';
import { Plugins } from '@capacitor/core';
import { LoadingController } from '@ionic/angular';

const { Storage } = Plugins;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  codeBar = '7622210204424'; // 3116430208941 // 3045140105502  // 7622210204424
  prod = '';
  inFavoris = false;
  danger = 'var(--ion-color-danger)';
  medium = 'var(--ion-color-medium)'

  constructor(
    private apiService: ApiService,
    public globalService: GlobalService,
    public loadingController: LoadingController
  ) {}


  async ionViewWillEnter() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.getProduct();
    })
  }
  // get product from codebar

  getProduct() {
    this.apiService.getData(this.globalService.codebar).subscribe((e) => {
      this.prod = e['product'];
      console.log(e)
      this.setStorageData();
      this.loadingController.dismiss();
      this.checkProdInFavoris();
      console.log(this.inFavoris)
    });
  }

   setStorageData(){
     // get data from storage

     Storage.get({key: 'historique'}).then((e) => {
      var data = JSON.parse(e.value);
      if (data === null) {
        data = [this.prod];
      } else {
        data.unshift(this.prod);
      }

      // Remove duplicated products

      this.globalService.historique = data.reduce((acc, current) => {
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
    });
  }

  addFavoris() {
    Storage.get({key: 'favoris'}).then((e) => {
      var data = JSON.parse(e.value);
      if(data === null) {
        data = [this.prod];
      } else {
        data.unshift(this.prod);
      }

      // Remove duplicated products

      this.globalService.favoris = data.reduce((acc, current) => {
        const x = acc.find(item => item._id === current._id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      // set data to storage

      Storage.set({
        key: 'favoris',
        value: JSON.stringify(this.globalService.favoris),
      })
        .then((res) => {
          console.log('data stored : ' + res);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    this.inFavoris = true;
  }

  checkProdInFavoris() {
    Storage.get({ key: 'favoris'}).then((e) => {
      const data = JSON.parse(e.value);
      for (var i = 0; i < data.length; i++) {
        const Val = data[i];
        if (Val._id === this.globalService.codebar) {
          this.inFavoris = true;
        } else {
          this.inFavoris = false;
        }
      };
    });
  }

  // logRatingChange(e) {
  //   console.log(e.newValue);
  // }
}
