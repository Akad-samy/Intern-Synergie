import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { GlobalService } from 'src/app/service/global.service';
import { Plugins } from '@capacitor/core';
import { LoadingController, AlertController } from '@ionic/angular';

const { Storage } = Plugins;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  // codeBar = '3116430208941'; // 3116430208941 // 3045140105502  // 7622210204424
  prod = '';
  inFavoris = false;
  danger = 'var(--ion-color-danger)';
  medium = 'var(--ion-color-medium)';

  constructor(
    private apiService: ApiService,
    public globalService: GlobalService,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {}

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      mode: 'ios',
    });
    await loading.present().then(() => {
      this.getProduct();
    });
  }

  // get product from codebar

  getProduct() {
    this.apiService.getData(this.globalService.codebar).subscribe(
      async (e) => {
        if (e['status'] === 0) { // product not found
          const alert = await this.alertController.create({
            header: 'Custplace',
            message: 'Produit non trouver! ',
            buttons: ['OK'],
            mode: 'ios',
          });
          await alert.present();
        }
        if(e['code'] !== null) { // a default product with code = null, shows
          this.prod = e['product'];
          this.setStorageData(); // set in History
          this.checkProdInFavoris();
        }
        this.loadingController.dismiss();
      },
      (err) => {
        console.log(err);
        this.loadingController.dismiss();
      }
    );
  }

  setStorageData() {
    // get data from storage

    Storage.get({ key: 'historique' })
      .then((e) => {
        var data = JSON.parse(e.value);
        if (data === null) { //if no data exist in history
          data = [this.prod];
        } else {
          data.unshift(this.prod);
        }

        // Remove duplicated products

        this.globalService.historique = data.reduce((acc, current) => {
          const x = acc.find((item) => item._id === current._id);
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
      })
      .catch((err) => {
        console.log(err);
        this.loadingController.dismiss();
      });
  }

  addFavoris() {
    Storage.get({ key: 'favoris' })
      .then((e) => {
        var data = JSON.parse(e.value);
        if (data === null) {
          data = [this.prod];
        } else {
          data.unshift(this.prod);
        }

        // Remove duplicated products

        this.globalService.favoris = data.reduce((acc, current) => {
          const x = acc.find((item) => item._id === current._id);
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
      .catch((err) => {
        console.log(err);
        this.loadingController.dismiss();
      });
    this.inFavoris = true;
  }

  checkProdInFavoris() {
    Storage.get({ key: 'favoris' })
      .then((e) => {
        const data = JSON.parse(e.value);
        if (data == null) {
          return;
        }
        for (var i = 0; i < data.length; i++) {
          const Val = data[i];
          if (Val._id === this.globalService.codebar) {
            this.inFavoris = true;
          } else {
            this.inFavoris = false;
          }
        }
      })
      .catch((err) => {
        console.log(err);
        this.loadingController.dismiss();
      });
  }
}
